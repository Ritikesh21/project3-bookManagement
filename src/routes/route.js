const express = require('express')
const router = express.Router()

const {createUser, loginUser} = require('../controller/userController')
router.post("/register", createUser)

router.post("/login", loginUser)

const {createBook, getBook, getBookById, updateBookById, deleteBookById} = require('../controller/bookController')
router.post("/books", createBook)

router.get('/books', getBook)

router.get('/books/:bookId', getBookById)

router.put('/books/:bookId', updateBookById)

router.delete('/books/:bookId', deleteBookById)

const {createReview, updateReviewById, deleteReviewById} = require('../controller/reviewController')
router.post("/books/:bookId/review", createReview)

router.put('/books/:bookId/review/:reviewId', updateReviewById)

router.delete('/books/:bookId/review/:reviewId', deleteReviewById)

module.exports = router