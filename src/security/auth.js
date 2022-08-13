const jwt = require('jsonwebtoken')
const {secretKey} = require('../config')

const authentication = async (req, res, next) => {
    try {
        const token = req.headers['group29']
        const decodedToken = jwt.verify(token, secretKey)
        req.decodedToken = decodedToken
        next()
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.authentication = authentication

const authorization1 = async (req, res, next) => {
    try {
        let reqUserId = req.body.userId
        let loginUserId = req.decodedToken.userId
        if(loginUserId != reqUserId){
            return res.status(403).send({status: false,
            message: "User logged in is not allowed to modify the requested book data"})
        }
        next()
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.authorization1 = authorization1

const authorization2 = async (req, res, next) => {
    try {
        let reqUserId = req.params.bookId
        let loginUserId = req.decodedToken.userId
        if(loginUserId != reqUserId.userId){
            return res.status(403).send({status: false,
            message: "User logged in is not allowed to modify the requested book data"})
        }
        next()
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.authorization2 = authorization2