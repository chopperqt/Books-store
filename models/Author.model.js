import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    _id: String,
    author_firstname: String,
    author_lastname: String,
    author_data: Array,
    author_books: Array,
    author_age: Number,
    author_country: String,
    author_address: String,
    author_email: String,
    author_phone: String,
    author_comments: Array,
    author_description: String,
    author_picture: String,
    author_avatar__type: Number
});

export const Author = mongoose.model('authors', authorSchema)