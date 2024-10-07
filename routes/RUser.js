import express from 'express';
import UserController from '../controllers/CUser.js';

const router = express.Router();

// Create a new User
router.post('/users', UserController.create);

// Retrieve all Users
router.get('/users', UserController.findAll);

// Retrieve a single User with userId
router.get('/users/:userId', UserController.findOne);

// Update a User with userId
router.put('/users/:userId', UserController.update);

// Delete a User with userId
router.delete('/users/:userId', UserController.deletee);

// Delete all Users
router.delete('/users', UserController.deleteAll);

export default router;
