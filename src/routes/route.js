const express = require('express')
const router = express.Router()

const {createUser, loginUser} = require('../controller/userController')
router.post("/register", createUser)

router.post('/login', loginUser)

const {createBook} = require('../controller/bookController')
router.post("/books", createBook)

const {createReview} = require('../controller/reviewController')
router.post("/books/:bookId/review", createReview)

module.exports = router