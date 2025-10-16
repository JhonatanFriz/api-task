import express from 'express';
import { tasksRouter } from '../src/routes/tasks.js';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true, service: 'API-REST TAREAS' }));
app.use('/tasks', tasksRouter);

export default app;
