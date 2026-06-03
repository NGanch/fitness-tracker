import {Router } from 'express';
import { getUsers, createUser, updateUser } from '../controllers/user.controller.js';

const router = Router();

router.post('/', createUser);

router.patch('/:id', updateUser);

router.get('/', getUsers);

export default router;