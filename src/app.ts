import express from 'express';
import cors from 'cors';
import { tasksRouter } from './routes/tasks.js';

const app = express();
app.use(cors({ origin :['http://localhost:5173',
    'https://task-client.vercel.app'] }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true, service: 'API-REST TAREAS' }));
app.use('/tasks', tasksRouter);

export default app;
