// tests/auth.test.js
import request from 'supertest';
import getApp from './helpers/getApp.js';
import prisma from '../src/config/prisma.js';

let app;
beforeAll(async()=>{
    app= await getApp();
});

afterAll(async()=>{
    await prisma.$disconnect();
});

test('Register -> login flow',async ()=>{
    const random = Math.random().toString(36).slice(2,9);
    const email = `test-${random}@example.com`;
    
    const registerRes = await request(app)
    .post('/api/auth/register')
    .send({name : 'Test User',email,password:'password123',role:'USER'});

    expect([201,409]).toContain(registerRes.status);//409 if user exists in DB

    const loginRes = await request(app)
    .post('/api/auth/login')
    .send({email,password: 'password123'});

    expect([200,201]).toContain(loginRes.status);
    expect(loginRes.body).toHaveProperty('data.token');
});