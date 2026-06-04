import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export const createUser = async (req: Request, res: Response) => {
  try{
    const { name, email } = req.body;
    
    const user = await prisma.user.create({
        data: {
        name,
      email,
    },
  });
  res.status(201).json(user);
} catch (error) {
  res.status(500).json({ error: 'Failed to create user' });
}
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { name, email } = req.body;

    const user = await prisma.user.update({
        where: {id: Number(id)},
        data: {
            name,
            email,
        }
    });
    res.status(201).json(user);
}
export const getUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};