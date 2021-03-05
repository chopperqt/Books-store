import express from 'express';
import {
    createBook,
    getBooks,
    getOneBook,
    getTotalBooks
} from '../controllers/books.js';
const router = express.Router();

//localhost:5000/posts
router.get('/', getBooks);
router.get('/total', getTotalBooks);
router.get('/add', createBook);
router.get('/:id', getOneBook);


//router.post('/', createPost);

export default router;