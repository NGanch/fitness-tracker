import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export const getEvents = async (_req: Request, res: Response) => {
  const events = await prisma.event.findMany({
    include: {
      author: true,
      participants: true,
    },
  });

  res.json(events);
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, category, location, startDate, duration, authorId, maxPeople } = req.body;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        category,
        location,
        startDate: new Date(startDate),
        duration,
        authorId,
        maxPeople,
      },
    });
    res.status(201).json(event)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the event' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, category, location, startDate, duration, maxPeople } = req.body;

    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        category,
        location,
        startDate: startDate ? new Date(startDate) : undefined,
        duration,
        maxPeople,
      },
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the event' });
  }
}

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.eventParticipant.deleteMany({
      where:{
        eventId: Number(id),
      },
    });
    
    await prisma.event.delete({
      where: { id: Number(id) },

    })
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the event' });
  }
}

export const joinEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
      include: { participants: true },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    const participant = await prisma.eventParticipant.create({
      data: {
        eventId: Number(id),
        userId: Number(userId),
      },
    });

    res.status(201).json(participant);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while joining the event' });
  }
}

export const leaveEvent = async (req: Request, res: Response) => {
  try {
    const { id, userId } = req.params;

    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
    });

    if(!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    await prisma.eventParticipant.deleteMany({  
      where: {
        eventId: Number(id),
        userId: Number(userId)
      }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while leaving the event' });
  }
}