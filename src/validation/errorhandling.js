const {validationResult} = require('express-validator')

const validatorError = async (req, res, next) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const temp = errors.array({onlyFirstError: true})
      const response = {status : false,
                        Error : temp[0]}
      if(temp[0].msg.includes('already in use')){
        return res.status(409).json(response)
      }
      return res.status(400).json(response)
    }
    next()
}

module.exports.validatorError = validatorError