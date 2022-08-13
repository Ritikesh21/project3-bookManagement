const {body, param, query} = require('express-validator')
const bookModel = require('../model/bookModel')

const title = 
                body('title')
                .exists()
                .withMessage('title Not Found')
                .isString()
                .withMessage('title must be in String')
                .custom(value => {
                    return bookModel.findOne({title : value}).then(user => {
                      if (user) {
                        return Promise.reject('title value already in use')
                      }
                    })
                  })
const createBookValidation = [
    title,
    body('excerpt')
    .exists()
    .withMessage('excerpt Not Found')
    .isString()
    .withMessage('excerpt must be in String'),
    /*body('userId')
    .exists()
    .withMessage('userId Not Found')
    .isMongoId()
    .withMessage('userId must be in MongoId'),*/
    body('ISBN')
    .exists()
    .withMessage('ISBN Not Found')
    .isISBN(13 || 10)
    .withMessage('ISBN is Invalid. Must be of length 10 or 13')
    .custom(value => {
      return bookModel.findOne({title : value}).then(user => {
        if (user) {
          return Promise.reject('ISBN value already in use')
        }
      })
    }),
    body('category')
    .exists()
    .withMessage('category Not Found')
    .isString()
    .withMessage('category must be in String'),
    body('subcategory')
    .exists()
    .withMessage('subcategory Not Found')
    .isString()
    .withMessage('subcategory must be in String'),
    body('reviews')
    .isInt(0)
    .withMessage('reviews must be in Integer Format')
    .custom(value => {
      if(value != 0){
        return Promise.reject('No Reviews yet Default value must be 0')
      }
      return true
    }),
    body('deletedAt')
    .optional()
    .isDate()
    .withMessage('deletedAt must be Date'),
    body('isDeleted')
    .optional()
    .isBoolean()
    .withMessage('isDeleted must be true or false'),
    body('releasedAt')
    .exists()
    .withMessage('releasedAt Not Found')
    .isISO8601('yyyy-mm-dd')
    .withMessage('releasedAt must be Date(YYYY-MM-DD)')
]

module.exports.createBookValidation = createBookValidation

const getBookValidation = [
  query('userId')
  .optional()
  .isMongoId()
  .withMessage('userId must be in MongoId'),
  query('category')
  .optional()
  .isString()
  .withMessage('category must be in String'),
  query('subcategory')
  .optional()
  .isString()
  .withMessage('subcategory must be in String'),
  query('reviews')
  .optional()
  .isInt()
  .withMessage('reviews must be in Integer')
]

module.exports.getBookValidation = getBookValidation

const getBookByIdValidation = [
    param('bookId')
    .exists()
    .withMessage('bookId Not Found')
    .isMongoId()
    .withMessage('bookId must be in MongoId')
    .custom(value => {
        return bookModel.findOne({_id : value}) })
    .withMessage('Invalid Book Id')
]

module.exports.getBookByIdValidation = getBookByIdValidation

const updateBookByIdValidation = [
  /*param('bookId')
  .exists()
  .withMessage('bookId Not Found')
  .isMongoId()
  .withMessage('bookId must be in MongoId')
  .custom(value => {
      return bookModel.findOne({_id : value}) })
  .withMessage('Invalid Book Id'),*/
  body('title')
  .optional()
  .isString()
  .withMessage('title must be in String'),
  body('excerpt')
  .optional()
  .isString()
  .withMessage('excerpt must be in String'),
  body('ISBN')
  .optional()
  .isISBN(13 || 10)
  .withMessage('ISBN number is Invalid. Length of ISBN must be 10 or 13'),
  body('releasedAt')
  .optional()
  .isISO8601('yyyy-mm-dd')
  .withMessage('releasedAt must be in Date(YYYY-MM-DD)')
]

module.exports.updateBookByIdValidation = updateBookByIdValidation

const deleteBookByIdValidation = [
  param('bookId')
  .exists()
  .withMessage('bookId Not Found')
  .isMongoId()
  .withMessage('bookId must be in MongoId')
  .custom(value => {
      return bookModel.findOne({_id : value}) })
  .withMessage('Invalid Book Id')
]

module.exports.deleteBookByIdValidation = deleteBookByIdValidation