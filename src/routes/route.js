const express = require('express')
const router = express.Router()

const {validatorError} = require('../validation/errorhandling')
const {createBookValidation, getBookByIdValidation, getBookValidation, updateBookByIdValidation, deleteBookByIdValidation} = require('../validation/bookValidation')

const {createUser, loginUser} = require('../controller/userController')
router.post("/register", createUser)

router.post("/login", loginUser)

const {createBook, getBook, getBookById, updateBookById, deleteBookById} = require('../controller/bookController')
router.post("/books", createBookValidation, validatorError, createBook)

router.get('/books', getBookValidation, validatorError, getBook)

router.get('/books/:bookId', getBookByIdValidation, validatorError, getBookById)

router.put('/books/:bookId', updateBookByIdValidation, validatorError, updateBookById)

router.delete('/books/:bookId', deleteBookByIdValidation, validatorError, deleteBookById)

const {createReview, updateReviewById, deleteReviewById} = require('../controller/reviewController')
router.post("/books/:bookId/review", createReview)

router.put('/books/:bookId/review/:reviewId', updateReviewById)

router.delete('/books/:bookId/review/:reviewId', deleteReviewById)

module.exports = router