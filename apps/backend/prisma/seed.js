import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // --- Create Users ---
  const users = await prisma.user.createMany({
    data: [
      {
        name: 'Alice Doe',
        email: 'alice@example.com',
        password: 'hashed_password_123', // just placeholder
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: 'hashed_password_456',
      },
    ],
  });

  console.log(`✅ Created ${users.count} users`);

  // --- Get users to create wallets ---
  const allUsers = await prisma.user.findMany();

  for (const user of allUsers) {
    const wallet = await prisma.wallet.create({
      data: {
        userId: user.id,
        balance: Math.random() * 5000,
      },
    });

    console.log(`💰 Created wallet for ${user.name} with balance ${wallet.balance}`);

    // Add a few transactions per wallet
    await prisma.transaction.createMany({
      data: [
        {
          amount: 100.5,
          type: 'CREDIT',
          description: 'Initial top-up',
          walletId: wallet.id,
        },
        {
          amount: 50.25,
          type: 'DEBIT',
          description: 'Purchase from merchant',
          walletId: wallet.id,
        },
      ],
    });
  }

  // --- Create Merchants ---
  const merchants = await prisma.merchant.createMany({
    data: [
      {
        name: 'TechZone',
        email: 'contact@techzone.com',
        apiKey: 'API_KEY_TECHZONE_001',
      },
      {
        name: 'FoodieMart',
        email: 'support@foodiemart.com',
        apiKey: 'API_KEY_FOODIEMART_002',
      },
    ],
  });

  console.log(`🛍️ Created ${merchants.count} merchants`);

  console.log('🌾 Seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
