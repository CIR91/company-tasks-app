// backend/tests/app.test.js

// 1) Carga variables de entorno
require('dotenv').config();

const mongoose = require('mongoose');
const request  = require('supertest');
const path     = require('path');

// URI base con fallback
const baseUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskapp';
const testUri = baseUri + '_test';

let app;          // nuestra app Express
let token, companyId, taskId;

describe('Flujo completo API', () => {
  beforeAll(async () => {
    // 2) Conecta a la DB de prueba
    await mongoose.connect(testUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // 3) Importa el servidor SÓLO después de conectar
    app = require('../server');
  });

  afterAll(async () => {
    // 4) Si estamos conectados, limpiamos y desconectamos
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.db.dropDatabase();
      await mongoose.disconnect();
    }
  });

  it('POST /api/auth/register → 201 + crear empresa/usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: '123456',
        companyName: 'TestCo'
      });
    expect(res.status).toBe(201);
  });

  it('POST /api/auth/login → 200 + token y companyId', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: '123456'
      });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
    // Extraemos el companyId del payload del JWT
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    companyId = payload.company;
  });

  it('GET /api/company → 200 + datos de la empresa', async () => {
    const res = await request(app)
      .get('/api/company')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(companyId);
  });

  it('POST /api/company/logo → 200 + subir logo', async () => {
    const res = await request(app)
      .post('/api/company/logo')
      .set('Authorization', `Bearer ${token}`)
      .attach('logo', path.join(__dirname, 'fixtures', 'logo.png'));
    expect(res.status).toBe(200);
    expect(res.body.logoUrl).toMatch(/\/uploads\//);
  });

  it('POST /api/tasks → 201 + crear tarea', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Tarea de prueba' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Tarea de prueba');
    taskId = res.body._id;
  });

  it('GET /api/tasks → 200 + listado con 1 tarea', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it('PUT /api/tasks/:id → 200 + actualizar completada', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ completed: true });
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it('DELETE /api/tasks/:id → 200 + borrada', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
