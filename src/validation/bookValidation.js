const {body, param, query} = require('express-validator')
const bookModel = require('../model/bookModel')

const createBookValidation = [
    body('title')
    .exists()
    .withMessage('No Requested Data Found')
    .isString()
    .withMessage('Enter the String Only')
    .custom(value => {
        return bookModel.findOne({title : value}).then(user => {
          if (user) {
            return Promise.reject('title already in use')
          }
        })
      }),
    body('excerpt')
    .exists()
    .withMessage('No Requested Data Found')
    .isString()
    .withMessage('Enter the String Only'),
    body('userId')
    .exists()
    .withMessage('No Requested Data Found')
    .isMongoId()
    .withMessage(''),
    body('ISBN')
    .exists()
    .withMessage('No Requested Data Found')
    .isISBN(13 || 10)
    .withMessage('')
    .custom(value => {
      return bookModel.findOne({title : value}).then(user => {
        if (user) {
          return Promise.reject('title already in use')
        }
      })
    }),
    body('category')
    .exists()
    .withMessage('No Requested Data Found')
    .isString()
    .withMessage(''),
    body('subcategory')
    .exists()
    .withMessage('No Requested Data Found')
    .isString()
    .withMessage(''),
    body('reviews')
    .optional()
    .isInt()
    .withMessage(''),
    body('deletedAt')
    .optional()
    .isDate()
    .withMessage(''),
    body('isDeleted')
    .optional()
    .isBoolean()
    .withMessage(''),
    body('releasedAt')
    .exists()
    .withMessage('')
    .isISO8601('yyyy-mm-dd')
    .withMessage('')
]

module.exports.createBookValidation = createBookValidation

const getBookValidation = [
 /*query('title')
  .optional()
  .isString()
  .withMessage('Enter the String Only'),
  query('excerpt')
  .optional()
  .isString()
  .withMessage('Enter the String Only'),*/
  query('userId')
  .optional()
  .isMongoId()
  .withMessage(''),
  /*query('ISBN')
  .optional()
  .isISBN(13 || 10)
  .withMessage(''),*/
  query('category')
  .optional()
  .isString()
  .withMessage(''),
  query('subcategory')
  .optional()
  .isString()
  .withMessage(''),
  query('reviews')
  .optional()
  .isInt()
  .withMessage('')/*,
  query('deletedAt')
  .optional()
  .isDate()
  .withMessage(''),
  query('isDeleted')
  .optional()
  .isBoolean()
  .withMessage(''),
  query('releasedAt')
  .optional()
  .isISO8601('yyyy-mm-dd')
  .withMessage()*/
]

module.exports.getBookValidation = getBookValidation

const getBookByIdValidation = [
    param('bookId')
    .custom(value => {
        return bookModel.findOne({_id : value}) })
    .withMessage('Invalid Book Id')
]

module.exports.getBookByIdValidation = getBookByIdValidation

const updateBookByIdValidation = [
  param('bookId')
  .custom(value => {
      return bookModel.findOne({_id : value}) })
  .withMessage('Invalid Book Id'),
  body('title')
  .optional()
  .isString()
  .withMessage('Enter the String Only'),
  body('excerpt')
  .optional()
  .isString()
  .withMessage('Enter the String Only'),
  body('ISBN')
  .optional()
  .isISBN(13 || 10)
  .withMessage(''),
  body('releasedAt')
  .optional()
  .isISO8601('yyyy-mm-dd')
  .withMessage()
]

module.exports.updateBookByIdValidation = updateBookByIdValidation

const deleteBookByIdValidation = [
  param('bookId')
  .custom(value => {
      return bookModel.findOne({_id : value}) })
  .withMessage('Invalid Book Id')
]

module.exports.deleteBookByIdValidation = deleteBookByIdValidation