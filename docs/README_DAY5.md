apps/backend/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.js
├── src/
│   ├── config/
│   │   └── prisma.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── walletController.js
│   │   └── transactionController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── ensureRole.js   (optional)
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── walletRoutes.js
│   │   └── transactionRoutes.js
│   └── server.js
├── package.json
├── .env
└── README.md


feat(wallet): add wallet controller (get/create) and read endpoints

feat(transactions): add deposit, withdraw, transfer with atomic Prisma transactions

feat(routes): add wallet & transaction routes (protected)

chore(server): register wallet & transaction routes

test(wallet): add curl/Postman examples + simple manual tests

feat(rbac): add role to User model and role middleware (optional)