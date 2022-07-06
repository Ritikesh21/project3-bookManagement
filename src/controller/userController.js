const userModel = require('../model/userModel')

const createUser = async (res, req) => {
    try {
        const data = req.body;
        if(data){
            const newUser = await userModel.create(data)
            res.status(201).send({status : true,
            data : newUser})
        }
        else{
            res.status(400).send({status : false,
            message : "No Data Found"})
        }
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.createUser = createUser

const loginUser = async (req, res) => {
    try {
        const data = req.body
        if(data){
            const user = await userModel.findOne({email : data.email, password : data.password})
            if (user){
                const token = jwt.sign({
                    userId : data.email._id
                }, 'project3Group29', {expiresIn : '300s'})
                res.setHeader('group29', token)
                res.status(201).send({status : true,
                message : 'Succesful Login',
                Token : token})
            }
            else{
                res.status(404).send({status : false,
                message : "User Not Found"})
            }
        }
        else{
            res.status(400).send({status : false,
            Message : "No Data Found"})
        }
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.loginUser = loginUser