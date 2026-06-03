import {Router } from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent, joinEvent, leaveEvent} from '../controllers/events.controller.js';

const router = Router();

router.get('/', getEvents);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.post('/', createEvent);
router.post('/:id/join', joinEvent);
router.delete('/:id/leave/:userId', leaveEvent);

export default router;