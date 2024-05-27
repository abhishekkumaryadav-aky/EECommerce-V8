const express = require('express');
const {isLoggedIn} = require('../../middleware')
const router = express.Router();//mini application
const User = require('../../models/User');

router.post('/products/:productId/like', isLoggedIn,async (req, res)=>{
    // console.log(req.params.id);
    // let user = req.user;
    // if(!user || !user.wishlist){
    //     return res.status(400).json({error:'User or wishlist not found'});
    // }
    // let isLiked = user.wishlist.includes(id);
    // console.log(isLiked);
    // res.json({isLiked});
    let {productId} = req.params;
    let user = req.user;
    let isLiked = user.wishlist.includes(productId);
    
    if(isLiked){
        await User.findByIdAndUpdate(req.user._id, {$pull: {wishlist : productId} },)
    }else{
        await User.findByIdAndUpdate(req.user._id, {$addToSet: {wishlist : productId} })
    }
    // console.log(id);
    // console.log(isLiked);
})

module.exports = router;