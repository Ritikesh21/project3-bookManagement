const express = require('express')
const router = express.Router()

const {createUser} = require('../controller/userController')
router.post("/", createUser)

const {createBook} = require('../controller/bookController')
router.post("/", createBook)

const {createReview} = require('../controller/reviewController')
router.post("/", createReview)

module.exports = router