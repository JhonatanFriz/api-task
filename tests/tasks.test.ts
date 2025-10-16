import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../api/app.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
    // Limpiar la base de datos antes de los tests
    await prisma.task.deleteMany();
});

afterAll(async () => {
    // Limpiar y desconectar después de los tests
    await prisma.task.deleteMany();
    await prisma.$disconnect();
});

describe('Tasks API', () => {
    it('GET /tasks -> lista vacía inicialmente', async () => {
        const res = await request(app).get('/tasks');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('POST /tasks -> crea una nueva tarea', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({ title: 'Primera tarea', description: 'Esta es una tarea de prueba' })
            .set('Content-Type', 'application/json');
        
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({ 
            title: 'Primera tarea', 
            description: 'Esta es una tarea de prueba', 
            completed: false 
        });
        expect(typeof res.body.id).toBe('number');
    });

    it('GET /tasks -> lista con la tarea', async () => {
        const res = await request(app).get('/tasks');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
    });

    it('PATCH /tasks/:id -> actualiza la tarea', async () => {
        const list = await request(app).get('/tasks');
        const id = list.body[0].id as number;

        const res = await request(app)
            .patch(`/tasks/${id}`)
            .send({ completed: true })
            .set('Content-Type', 'application/json');
            
        expect(res.status).toBe(200);
        expect(res.body.completed).toBe(true);
    });
});

