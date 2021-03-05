import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    _id: String,
    book_name: String,
    book_data: String,
    book_authors: Array,
    book_price: Number,
    book_rating: Number,
    book_comments: Array,
    book_sells: Number,
    book_books: Number,
    book_description: String,
    book_picture: String,
    book_discount: Number,
    book_bestseller: Boolean,
    book_pages: Number,
    book_genres: Array,
    book_age_limit: Number
});

export const Books = mongoose.model('books', bookSchema);
