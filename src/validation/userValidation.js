const {body} = require('express-validator')

const createUserValidation = [
    body('title')
    .exists()
    .withMessage('title Not Found')
    .isString()
    .withMessage('title must be in String')
    .isAlpha()
    .withMessage('title must be Alphabets only')
    .isIn(['Mr', 'Mrs', 'Miss'])
    .withMessage('title must be Mr, Mrs or Miss'),
    body('name')
    .exists()
    .withMessage('name Not Found')
    .isString()
    .withMessage('name must be in String'),
    body('phone')
    .exists()
    .withMessage('phone Not Found')
    .isMobilePhone()
    .withMessage('Invalid Mobile Number')
    .isLength({
        min : 10,
        max : 10
    })
    .withMessage('Phone Number must contain 10 digit')
    .custom(value => {
        return userModel.findOne({title : value}).then(user => {
          if (user) {
            return Promise.reject('Phone already in use')
          }
        })
      }),
    body('email')
    .exists()
    .withMessage('email Not Found')
    .isEmail()
    .withMessage('Invalid Mail Id')
    .isString()
    .withMessage('email must be in String')
    .custom(value => {
        return userModel.findOne({title : value}).then(user => {
          if (user) {
            return Promise.reject('Email already in use')
          }
        })
      }),
    body('password')
    .exists()
    .withMessage('password Not Found')
    .isString()
    .withMessage('password must be in String')
    .isLength({
        min : 8,
        max : 15
    })
    .withMessage('Password must contain minimum 8 Characters')
    .isStrongPassword()
    .withMessage('password must be strong'),
    body('address')
    .optional()
    .isObject()
    .withMessage('address must be in Object format')
]

module.exports.createUserValidation = createUserValidation

const loginUserValidation = [
    body('email')
    .exists()
    .withMessage('email Not Found')
    .isEmail()
    .withMessage('Invalid Mail Id')
    .isString()
    .withMessage('email must be in String'),
    body('password')
    .exists()
    .withMessage('password Not Found')
    .isString()
    .withMessage('password must be in String')
]

module.exports.loginUserValidation = loginUserValidation