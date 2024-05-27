const express = require("express");
const { isLoggedIn } = require("../middleware");
const User = require("../models/User");
const Product = require("../models/Product");
const router = express.Router();//mini application


router.get("/user/cart",isLoggedIn, async(req,res)=>{
    let userId = req.user._id;
    let user = await User.findById(userId).populate("cart");
    let totalAmount = user.cart.reduce((sum, curr)=> sum + curr.price, 0);
    res.render("cart/cart", {user, totalAmount});
})




router.post("/user/:productId/add",isLoggedIn, async (req,res)=>{
    try {
        const { productId } = req.params;
        const userId = req.user._id; // Assuming `req.user` contains the authenticated user
        // Find the user by ID and populate the cart
        const user = await User.findById(userId).populate('cart');
        // Handle case where user is not found
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        // Find the product by ID
        const product = await Product.findById(productId);
        // Handle case where product is not found
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        // Add product to user's cart
        user.cart.push(product);
        // Save the updated user
        await user.save();
        // Redirect to the user's cart page
        res.redirect('/user/cart'); // Ensure this matches your actual route
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
})




module.exports = router;
