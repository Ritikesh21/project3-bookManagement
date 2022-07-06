const reviewModel = require('../model/reviewModel')

const createReview = async (req, res) => {
    try {
        const data = req.body;
        if(data){
            const newReview = await reviewModel.create(data)
            res.status(201).send({status : true,
            data : newReview})
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

module.exports.createReview = createReview