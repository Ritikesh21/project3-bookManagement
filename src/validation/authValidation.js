const {header, body, param} = require('express-validator')

const authenticationValidation = [
    header('group29')
    .exists()
    .withMessage('')
]

module.exports.authenticationValidation = authenticationValidation

const authorization1Validation = [
    body('userId')
    .exists()
    .withMessage('')
    .isMongoId()
    .withMessage('')
    .custom(value => {
        return userModel.findOne({_id : value}).then(user => {
          if (user) {
            return true
          }
        })
    })
    .withMessage('')
]

module.exports.authorization1Validation = authorization1Validation

const authorization2Validation = [
    param('bookId')
    .exists()
    .withMessage('')
    .isMongoId()
    .withMessage('')
    .custom(value => {
        return bookModel.findOne({_id : value}).then(user => {
          if (user) {
            return userModel.findOne({_id : user.userId}).then(data => {
                if (data) {
                  return true
                }
              })
          }
        })
    })
    .withMessage('')
]

module.exports.authorization2Validation = authorization2Validation