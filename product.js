const express = require('express')
const Product = require('../models/Product')
const router = express.Router();//mini application
const Review = require('../models/Review')
const {validateProduct,isLoggedIn,isSeller} = require('../middleware')
//read
router.get('/products', async(req, res)=>{
    try{
        
    let products = await Product.find({});
    res.render('products/index', {products});
    }
    catch(e){
        res.status(500).render('error', {error:e.message})
    }
});

//new form show krna hain
router.get('/products/new', isLoggedIn,isSeller,(req, res)=>{
    try{
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('error', {error:e.message})
    }
})

// actually adding in the DB
router.post('/products', isLoggedIn,validateProduct,isSeller, async (req, res)=>{
   try{
    let {name, img, price, desc} = req.body;// by default undefined
    await Product.create({name, img, price, desc,author:req.user._id}); // automatically db save
    req.flash('success', 'product added successfully')
    res.redirect('/products')
   }
   catch(e){
    res.status(500).render('error', {error:e.message})
   }
})

// Show a particular product
router.get('/products/:id', isLoggedIn,async(req, res)=>{
    try{
        let {id} = req.params;
    // let foundProduct = await Product.findById(id);

    let foundProduct = await Product.findById(id).populate('reviews');
    // console.log(foundProduct);
    // req.flash('success', 'product edited successfully')
    res.render('products/show', {foundProduct, success:req.flash('msg')});
    }
    catch(e){
        res.render('error', {error:e.message})
    }
})

// Show edit form
router.get('/products/:id/edit', isLoggedIn,isSeller,async(req, res)=>{
   try{
    let {id} = req.params;
    // let foundProduct = await Product.findById(id);
    let foundProduct = await Product.findById(id);
    res.render('products/edit',{foundProduct});
   }
   catch(e){
    res.render('error', {error:e.message})
   }
})

//Actually changing the product
router.patch('/products/:id', isLoggedIn,isSeller,async(req, res)=>{
    try{
    let {id} = req.params;
    let {name, img, price, desc} = req.body;
    await Product.findByIdAndUpdate(id, {name, img, price, desc});
    req.flash('success', 'Product edited successfully');
    res.redirect(`/products/${id}`);
    }
    catch(e){
        res.render('error', {error:e.message})
    }
})

//deleting
router.delete('/products/:id', isLoggedIn,isSeller, async(req, res)=>{
    try{
    let {id} = req.params;
    let foundProduct = await Product.findById(id);
    // deleting reviews before deleting products
    for(let ids of foundProduct.reviews){
      await  Review.findByIdAndDelete(ids);
    }

    await Product.findByIdAndDelete(id);
    req.flash('success', 'Product deleted Successfully');
    res.redirect('/products')
    }
    catch(e){
        res.render('error', {error:e.message})
    }
})
module.exports = router;