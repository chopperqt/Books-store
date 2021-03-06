import {Books} from '../models/Books.model.js';

export const getBooks = async (req,res) => {
    try {
        let booksLimit = Number(req.headers.limit) || 3;
        let booksSkip = Number(req.headers.skip) || 0;
        const all_books = await Books.find({}).limit(booksLimit).skip(booksSkip)
        console.log('itemsPerPage: ',req.headers.limit)
        res.status(200).json(all_books);

    } catch (error) {
        res.status(404).json({message: error.message}) 
    }
}
export const getOneBook = async (req,res) => {
    try{
        const findOneBook = await Books.findOne({_id: req.params.id})
        res.status(200).json(findOneBook)
    } catch (error) {
        res.statsu(404).json({message: error})
    }
}
export const createBook = async (req, res) => {
    const post = {
        _id: 1,
        _id_book: "123123",
        comment: "Dawdawdawd"
    };

    const newPost = new Books(post)

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({messaage: error.message})
    }
}

//only numbers
export const getTotalBooks = async (req,res) => {
    try {
        const all_books = await Books.count({})
        
        res.status(200).json(all_books);

    } catch (error) {
        res.status(404).json({message: error.message}) 
    }
}