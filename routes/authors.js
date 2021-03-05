import express from 'express';
import {
    getAuthors,
    getOneAuthor,
    getTotalAuthors
} from '../controllers/authors.js';

const router = express.Router();

router.get('/', getAuthors);
router.get('/total', getTotalAuthors);
router.get('/:id', getOneAuthor);

export default router