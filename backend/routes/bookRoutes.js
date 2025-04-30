import express from 'express';
import mongoose from 'mongoose';
import Book from '../model/Books.js'; // import the book model
import { addBooks, deleteBooks, getBooks, updateBooks, deleteAllBooks } from '../controller/bookController.js';

// creates another extension of express called router
const router = express.Router();


router.post("/", addBooks);

router.patch("/:id", updateBooks);

router.delete("/:id", deleteBooks);

router.delete("/", deleteAllBooks);

router.get("/", getBooks);

export default router;