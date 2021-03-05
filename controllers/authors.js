import {Author} from '../models/Author.model.js';

export const getAuthors = async (req,res) => {
    try {
        const all_authors = await Author.find({})

        res.status(200).json(all_authors);
    }catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getOneAuthor = async(req,res) => {
    try{
        const findOneAuthor = await Author.findOne({_id: req.params.id})
        res.status(200).json(findOneAuthor)
    }catch (error) {
        res.status(404).json({message: error})
    }
}

export const getTotalAuthors = async(req,res) => {
    try {
        const totalAuthors = await Author.count()
        res.status(200).json(totalAuthors)
    } catch (error) {
        res.status(404).json({message: error})
    }
}