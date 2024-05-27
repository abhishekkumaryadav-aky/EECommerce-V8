const express = require('express')
const Product = require('../models/Product')
const Review = require('../models/Review')
const router = express.Router();//mini application
const {validateReview,isLoggedIn} = require('../middleware')
//review Route
router.post('/products/:id/rating',isLoggedIn,validateReview, async (req, res)=>{
    try{
    let { id } = req.params;
    let {rating, comment} = req.body;
    let product = await Product.findById(id);
    // new review
    let review = new Review({ rating, comment});
    product.reviews.push(review);

   await product.save();
   await review.save();

   //adding flash messages
   req.flash('success', 'Review Added Successfully');
   res.redirect(`/products/${id}`)//Show
    }
    catch(e){
        res.render('error', {error:e.message});
    }
})

module.exports = router;