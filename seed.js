const mongoose = require('mongoose')
const Product = require('./models/Product')
const products = [
    {
        name:"iPhone 15Pro",
        img: "https://m.media-amazon.com/images/I/81SigpJN1KL._AC_UF1000,1000_QL80_.jpg",
        price: 138000,
        desc:"Premium Phone"
    },
    {
        name:"Macbook Pro",
        img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
        price:230000,
        desc:" It is powered by a Core i5 processor and it comes with 12GB of RAM."
    },
    {
        name:"Apple Pencil",
        img:"https://images.unsplash.com/photo-1547571031-4c1023b95da6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEFwcGxlJTIwUGVuY2lsfGVufDB8fDB8fHww",
        price:10000,
        desc:"I can write future"
    }
]

async function seedDB(){
   await Product.insertMany(products);
   console.log("DB Seeded");
}

module.exports = seedDB;