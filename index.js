import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import booksRoutes from './routes/books.js';
import authorsRoutes from './routes/authors.js';

//const express = require('express');
const app = express();



app.use(bodyParser.json({limig: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limig: "30mb", extended: true}));
app.use(cors());
 
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);
//
const CONNECTION_URL = 'mongodb+srv://root:root@books-store-database.ugf7w.mongodb.net/book_store_db?retryWrites=true&w=majority';
const PORT = process.env.PORT || 8181;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);