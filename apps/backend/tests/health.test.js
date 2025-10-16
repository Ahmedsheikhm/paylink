import request from 'supertest';
import getApp from './helpers/getApp.js';

let app;
beforeAll(async()=>{
    app=await getApp();
});

test('GET /api/health should retur 200',async () =>{
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status');
});