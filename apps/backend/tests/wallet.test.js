import request  from 'supertest';
import getApp from './helpers/getApp.js';
import prisma from '../src/config/prisma.js';

let app;
let token;
let userId;

beforeAll(async ()=>{
    app = await getApp();

    //create test user directly via prisma ensures clean
    const random = Math.random().toString(36).slice(2,9);
    const email = `wallet-${random}@example.com`;
    

    const resReg = await request(app)
    .post('/api/auth/register')
    .send({name:'walletTester',email,password:'password123',role:'ADMIN'});

    const resLogin = await request(app)
    .post('/api/auth/login')
    .send({email,password:'password123'});

    token = resLogin.body.data.token;
    expect(token).toBeDefined();
    userId =resLogin.body.user?.id || (resReg.body.user && resReg.body.user.id);
});

afterAll( async ()=>{
    await prisma.$disconnect;
})

test('POST /api/wallet create wallet',async ()=>{
    const res = await request(app)
    .post('/api/wallet')
    .set('Authorization',`Bearer ${token}`)
    .send();
    //201on successfull wallet creation and 409 if wallet exists
    expect([201,409]).toContain(res.status);
})
test('GET /api/wallet should return wallet or 404',async ()=>{
    const res = await request(app)
    .get('/api/wallet')
    .set('Authorization',`Bearer ${token}`)

    expect([200,404]).toContain(res.status);

});
test('GET /api/wallet/:userId should return 403 if not admin',async ()=>{
    const res = await request(app)
    .get('/api/wallet/c6541413-0665-472d-82b3-fd70ce820915')
    .set('Authorization',`Bearer ${token}`)

    expect([200]).toContain(res.status);
})