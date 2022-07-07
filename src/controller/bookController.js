const bookModel = require('../model/bookModel')
const reviewModel = require('../model/reviewModel')

const createBook = async (req, res) => {
    try {
        const data = req.body;
        const newBook = await bookModel.create(data)
        res.status(201).send({status : true,
        data : newBook})
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.createBook = createBook

const getBook = async (req, res) => {
    try {
        const condition = req.query
        if(Object.keys(condition).length != 0){
            const books = await bookModel.find(condition, {_id : 1, title : 1, excerpt : 1, userId : 1, category : 1, releasedAt : 1, reviews : 1})
            if(books){
                res.status(200).send({status : true,
                data : books})
            }
            else{
                res.status(404).send({status : false,
                message : "No Data Found"})
            }
        }
        else{
            const books = await bookModel.find({isDeleted : false}, {_id : 1, title : 1, excerpt : 1, userId : 1, category : 1, releasedAt : 1, reviews : 1})
            if(books){
                res.status(200).send({status : true,
                data : books})
            }
            res.status(404).send({status : false,
            message : "No Data Exist"})
        }  
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.getBook = getBook

const getBookById = async (req, res) => {
    try {
        const bookId = req.params.bookId
        const book = await bookModel.find({_id : bookId})
        if (Object.keys(book).length != 0){
            const review = await reviewModel.find({bookId : bookId})
            if(review.length != 0){
                book[0] = {...book[0]._doc, reviewsData : review}
            }
            else{
                book[0] = {...book[0]._doc, reviewsData : []}
            }
            res.status(200).send({status : true,
            data : book})
        }
        else{
            res.status(404).send({status : false,
            message : 'No Data Exists'})
        }
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.getBookById = getBookById

const updateBookById = async (req, res) => {
    try {
        const bookId = req.params.bookId
        const condition = req.body
        const data = await bookModel.findOneAndUpdate({_id : bookId, isDeleted : false}, condition, {new : true})
        res.status(200).send({status : true,
        data : data})
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.updateBookById = updateBookById

const deleteBookById = async (req, res) => {
    try {
        const bookId = req.params.bookId
        const book = await bookModel.findOneAndUpdate({_id : bookId, isDeleted : false}, {isDeleted : true}, {new : true})
        if(book){
            res.status(200).send({status : true,
            Message : "Data Deleted Successfully"})
        }
        else{
            res.status(404).send({status : true,
            Message : "No Data Found"})
        }

    } catch (error) {
        res.status(500).send({status : false,
        Error : error}) 
    }
}

module.exports.deleteBookById = deleteBookById