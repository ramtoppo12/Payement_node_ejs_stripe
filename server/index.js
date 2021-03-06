//importing Modules
const express = require("express");
const bodyParser= require("body-parser");

const path = require("path");

//initalizing App 
const app = express();

//Strip credentials

const PUBLISHABLE__KEY="Your key";
const SECRET__KEY = "your secret key";

//importing Stripe Modules

const stripe = require("stripe")(SECRET__KEY);

//middlewares

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



//setup EJS

app.set("view engine","ejs");

//setting up ROUTES

app.get("/",(req,res)=>{
    res.render('Home',{
        key:PUBLISHABLE__KEY
    })
})


app.post("/payment",(req,res)=>{
    stripe.customers.create({
        email:req.body.stripEmail,
        source:req.body.stripeToken,
        name:"Ram kumar toppo",
        address:{
            line1:"123 street",
            postal_code:"834010",
            city:"Ranchi",
            state:"Jharkhand"
        }
    }).then((customer)=>{
        return stripe.charges.create({
            amount:70000000,
            description:"App that never going to waste",
            currency:"INR",
            customer:customer.id
        })
    }).then((charge)=>{
        console.log(charge)
        res.send("Sucess")
    }).catch(err=>{
        console.log(err)
    })
})
//PORT
const PORT = process.env.PORT || 3000;




//APP listening in develeopment mode
app.listen(PORT,()=>{
    console.log(`App is listening ${PORT}`);
})