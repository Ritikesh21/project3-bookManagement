const bookModel = require('../model/bookModel')

const createBook = (req, res) => {
    try {
        const data = req.body;
        if(data){
            const newBook = bookModel.create(data)
            res.status(201).send({status : true,
            data : newBook})
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

module.exports.createBook = createBook