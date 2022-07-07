const bookModel = require('../model/bookModel')
const reviewModel = require('../model/reviewModel')

const createReview = async (req, res) => {
    try {
        const bookId = req.params.bookId
        const data = req.body
        const bookData = await bookModel.findOne({_id : bookId, isDeleted : false})
        const book = await bookModel.findOneAndUpdate({_id : bookId, isDeleted : false}, {reviews : bookData.reviews+1}, {new : true})
        if(Object.keys(book).length != 0){
            const newReview = await reviewModel.create(data)
            res.status(201).send({status : true,
            data : newReview})
        }
        else{
            res.status(404).send({status : false,
            Message : 'Book Not Found'})
        }
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.createReview = createReview

const updateReviewById = async (req, res) => {
    try {
        const bookId = req.params.bookId
        const reviewId = req.params.reviewId
        const data = req.body
        const book = await bookModel.find({_id : bookId, isDeleted : false})
        if(book){
            const review = await reviewModel.findOneAndUpdate({_id : reviewId, isDeleted : false}, data, {new : true})
            const bookReviews = await reviewModel.find({bookId : bookId, isDeleted : false})
            book[0] = {...book[0]._doc, reviewsData : bookReviews}
            res.status(200).send({status : true,
            data : book})
        }
        else{
            res.status(404).send({status : false,
            Message : 'No Data Found'})
        }
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.updateReviewById = updateReviewById

const deleteReviewById = async (req, res) => {
    try {
        const bookId = req.params.bookId
        const reviewId = req.params.reviewId
        const book = await bookModel.findOne({_id : bookId, isDeleted : false})
        if(book){
            const review = await reviewModel.findOneAndUpdate({_id : reviewId, isDeleted : false}, {isDeleted : true}, {new : true})
            const updatedBook = await bookModel.findOneAndUpdate({_id : bookId, isDeleted : false}, {reviews : book.reviews-1}, {new : true})
            res.status(200).send({status : true,
            data : updatedBook})
        }
        else{
            res.status(404).send({status : false,
            Message : 'No Data Found'})
        }
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.deleteReviewById = deleteReviewById