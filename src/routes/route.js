const express = require('express')
const router = express.Router()

const {validatorError} = require('../validation/errorhandling')

const {createUser, loginUser} = require('../controller/userController')
const {createUserValidation, loginUserValidation} = require('../validation/userValidation')
router.post("/register", createUserValidation, validatorError, createUser)

router.post("/login", loginUserValidation, validatorError, loginUser)

const {createBook, getBook, getBookById, updateBookById, deleteBookById} = require('../controller/bookController')
const {createBookValidation, getBookByIdValidation, getBookValidation, updateBookByIdValidation, deleteBookByIdValidation} = require('../validation/bookValidation')
router.post("/books", createBookValidation, validatorError, createBook)

router.get('/books', getBookValidation, validatorError, getBook)

router.get('/books/:bookId', getBookByIdValidation, validatorError, getBookById)

router.put('/books/:bookId', updateBookByIdValidation, validatorError, updateBookById)

router.delete('/books/:bookId', deleteBookByIdValidation, validatorError, deleteBookById)

const {createReview, updateReviewById, deleteReviewById} = require('../controller/reviewController')
const { createReviewValidation, updateReviewByIdValidation, deleteReviewByIdValidation } = require('../validation/reviewValidation')
router.post("/books/:bookId/review", createReviewValidation, validatorError, createReview)

router.put('/books/:bookId/review/:reviewId', updateReviewByIdValidation, validatorError, updateReviewById)

router.delete('/books/:bookId/review/:reviewId', deleteReviewByIdValidation, validatorError, deleteReviewById)

module.exports = router