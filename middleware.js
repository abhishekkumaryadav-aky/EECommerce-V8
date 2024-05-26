const Product = require("./models/Product");
const {productSchema,reviewSchema} = require('./schema')

const validateProduct = (req,res,next)=>{
    let{name, img, price, desc} = req.body;
    const {error} = productSchema.validate({name,img, price, desc})
    if(error){
       const msg = error.details.map((error)=>error.message).join(',');
       return res.render('error', {error:msg})
    }
    next();
}

const validateReview = (req,res,next)=>{
    let{rating, comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment});
    if(error){
        const msg = error.details.map((error)=>error.message).join(',');
        return res.render('error', {error:msg})
     }
     next();
}
const isLoggedIn = (req,res,next)=>{
    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).send('unauthorised');
    }
    // console.log(req.xhr); // AJAX hai ya nhi
    if(!req.isAuthenticated()){
        req.flash('error','You need to login first');
        return res.redirect('/login');
    }
    next();
}

const isSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error', 'You do not have the permissions');
        return res.redirect('/products');
    }
    else if(req.user.role!=="seller"){
        req.flash('flash', 'You do not have permissions');
        return res.redirect(`/products/${id}`);
    }
    next();
}


const isProductAuthor = async(req,res,next)=>{
    let {id} = req.params;
    let product = await Product.findById(id);
    console.log(product.author, 'author');
    console.log(req.user, 'user');
    if(!product.author.equals(req.user._id)){
        req.flash('error', 'You are not the owner of this product');
        return res.redirect(`/products/${id}`);
    }
    next();
}
module.exports = {validateProduct, validateReview, isLoggedIn,isSeller,isProductAuthor};