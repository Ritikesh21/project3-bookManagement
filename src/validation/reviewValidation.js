const {body, param} = require('express-validator')

const createReviewValidation = [
    body('bookId')
    .exists()
    .withMessage('bookId Not Found')
    .isMongoId()
    .withMessage('bookId must be in MongoId'),
    body('reviewedBy')
    .exists()
    .withMessage('reviewedBy Not Found')
    .isString()
    .withMessage('reviewedBy must be in String'),
    body('reviewedAt')
    .exists()
    .withMessage('reviewedAt Not Found')
    .isDate()
    .withMessage('reviewedAt must be in Date'),
    body('rating')
    .exists()
    .withMessage('rating Not Found')
    .isInt()
    .withMessage('rating must be in Integer Format')
    .custom(value => {
        if(value < 0 || value > 5){
            return Promise.reject('Please Enter a Valid Rating Between 1 to 5')
        }
    }),
    body('review')
    .optional()
    .isString()
    .withMessage('review must be in String'),
    body('isDeleted')
    .optional()
    .isBoolean()
    .withMessage('isDeleted must be true or false')
]

module.exports.createReviewValidation = createReviewValidation

const updateReviewByIdValidation = [
    param('bookId')
    .exists()
    .withMessage('bookId Not Found')
    .custom(value => {
        return bookModel.findOne({_id : value}) })
    .withMessage('Invalid Book Id'),
    param('reviewId')
    .exists()
    .withMessage('reviewId Not Found')
    .custom(value => {
        return reviewModel.findOne({_id : value}) })
    .withMessage('Invalid Review Id'),
    body('review')
    .optional()
    .isString()
    .withMessage('review must be in String'),
    body('rating')
    .optional()
    .isInt()
    .withMessage('rating must be in Integer Format')
    .custom(value => {
        if(value < 0 || value > 5){
            return Promise.reject('Please Enter a Valid Rating Between 1 to 5')
        }
    }),
    body('reviewedBy')
    .optional()
    .isString()
    .withMessage('reviewedBy must be in String')
]

module.exports.updateReviewByIdValidation = updateReviewByIdValidation

const deleteReviewByIdValidation = [
    param('bookId')
    .exists()
    .withMessage('bookId Not Found')
    .custom(value => {
        return bookModel.findOne({_id : value}) })
    .withMessage('Invalid Book Id'),
    param('reviewId')
    .exists()
    .withMessage('reviewId Not Found')
    .custom(value => {
        return reviewModel.findOne({_id : value}) })
    .withMessage('Invalid Review Id')
]

module.exports.deleteReviewByIdValidation = deleteReviewByIdValidation