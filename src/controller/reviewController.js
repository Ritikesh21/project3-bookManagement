const ReviewModel = require('../model/reviewModel')

const createReview = (req, res) => {
    try {
        const data = req.body;
        if(data){
            const newReview = ReviewModel.create(data)
            res.status(201).send({status : true,
            data : newReview})
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

module.exports.createReview = createReview