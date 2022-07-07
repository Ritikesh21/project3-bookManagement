const express = require('express')
const router = express.Router()

const {createUser, loginUser} = require('../controller/userController')
router.post("/register", createUser)

router.post("/login", loginUser)

const {createBook, getBook, getBookById, updateBookById} = require('../controller/bookController')
router.post("/books", createBook)

router.get('/books', getBook)

router.get('/books/:bookId', getBookById)

router.put('/books/:bookId', updateBookById)

const {createReview} = require('../controller/reviewController')
router.post("/books/:bookId/review", createReview)

module.exports = router