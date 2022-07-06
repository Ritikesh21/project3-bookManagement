const bookModel = require('../model/bookModel')

const createBook = async (req, res) => {
    try {
        const data = req.body;
        if(data){
            const newBook = await bookModel.create(data)
            res.status(201).send({status : true,
            data : newBook})
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

module.exports.createBook = createBook