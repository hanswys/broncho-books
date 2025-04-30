import express from 'express';
import mongoose from 'mongoose';
import User from '../model/Users.js'; // import the user model
import { addUsers, deleteUsers, getUsers, updateUsers, loginUser, getUserEmail } from '../controller/userController.js';

// creates another extension of express called router
const router = express.Router();



router.patch("/:id", updateUsers);

router.delete("/:id", deleteUsers);

router.get("/", getUsers);

router.post("/", addUsers); // Add user route

router.post("/login", loginUser); // Login route

router.get("/:id", getUserEmail);


export default router;