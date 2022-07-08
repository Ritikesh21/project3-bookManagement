const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const { secretKey } = require('../config')

const createUser = async (req, res) => {
    try {
        const data = req.body
        const newUser = await userModel.create(data)
        console.log(newUser)
        res.status(201).send({status : true,
        data : newUser})
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.createUser = createUser

const loginUser = async (req, res) => {
    try {
        const data = req.body
        const user = await userModel.findOne(data)
        if (Object.keys(user).length != 0){
            let token = jwt.sign({
                userId : user._id
            }, secretKey, {expiresIn : '300s'})
            res.setHeader('group29', token)
            res.status(201).send({status : true,
            message : 'Succesful Login',
            Token : token})
        }
        else{
            res.status(404).send({status : false,
            message : "User Not Found"})
        }
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.loginUser = loginUser