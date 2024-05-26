const Joi = require('joi');

const productSchema = Joi.object({
    name:Joi.string().required().trim(),
    img:Joi.string().required().trim(),
    price:Joi.number().min(0).required(),
    desc:Joi.string().required().trim()
});


const reviewSchema = Joi.object({
    rating:Joi.number().min(0).max(5),
    comment:Joi.string().required().trim()
})

module.exports = {productSchema, reviewSchema}












