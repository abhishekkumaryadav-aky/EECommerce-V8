const express = require('express')
const app = express();// instance
const path = require('path')
const mongoose = require('mongoose');
const seedDB = require('./seed')
const methodOverride =require('method-override')
const flash = require('connect-flash');
const session = require('express-session');
const reviewRoutes = require('./routes/review');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const productApi = require('./routes/api/productapi');
const passport = require('passport') //Passport
const User = require('./models/User') // Passport
const LocalStrategy = require('passport-local'); //Passport
//override with POST having?_method=DELETE









mongoose.connect('mongodb://127.0.0.1:27017/julybatch')// returns a promise
.then(()=>{
    console.log("Database Connected");
})
.catch((err)=>{
    console.log("error is: ", err);
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(express.urlencoded({extended:true}));//form data body parser
app.use(methodOverride('_method'))

// seedDB() // baar baar store hojayega if not commented


let configSession = {
    secret:'keyboard cat',
    resave:false,
    saveUnintialized:false,
    // cookie:{secure:true}
    cookies:{
        httpOnly:true,
        expires:Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000
    }
}

app.use(session(configSession));
app.use(flash());




// use static serialize and deserialize of model for passport session support
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser()); //passport
passport.deserializeUser(User.deserializeUser()); //pasport

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate())); //passport


app.use( (req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
} )

app.get("/",(req,res)=>{
    res.render("home");
});


app.use(productRoutes); // hr incoming request ko check kro
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productApi);

const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`Server running at port : ${PORT}`);
})





// 1.Basic Server
// 2.Mongoose Connection
// 3.Model -> seed data
// 4.Routes -> views
// 5. rating schema -> Product change -> form too add the rating and comment(show.ejs)