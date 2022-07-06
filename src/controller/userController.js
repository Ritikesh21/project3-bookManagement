const userModel = require('../model/userModel')

const createUser = (res, req) => {
    try {
        const data = req.body;
        if(data){
            const newUser = userModel.create(data)
            res.status(201).send({status : true,
            data : newUser})
        }
        else{
            res.status(404).send({status : false,
            message : "No Data Found"})
        }
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.createUser = createUser