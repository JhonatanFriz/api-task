import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
export const tasksRouter = Router();

const createTaskDto = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    completed: z.boolean().optional().default(false),
});

tasksRouter.get('/', async (_req, res, next) => {
    try {
        const tasks = await prisma.task.findMany({ orderBy : { id: 'asc' } });
        res.json(tasks);
    } catch (error) {
        next(error);
    }
});

tasksRouter.post('/', async (req, res, next) => {
    try {
        const parsed = createTaskDto.parse(req.body);
        // Prisma TaskCreateInput expects `description: string` (no undefined),
        // así que aseguramos que sea string ('' por defecto) antes de crear.
        const data = {
            title: parsed.title,
            description: parsed.description ?? '',
            completed: parsed.completed ?? false,
        };

        const task = await prisma.task.create({ data });
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
});

tasksRouter.patch('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const task = await prisma.task.update({
            where: { id },
            data : { completed: true }
        });
        res.json(task);
    } catch (error) {
        next(error);
    }
});

