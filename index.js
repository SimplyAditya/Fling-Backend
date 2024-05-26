// "use strict"
import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import registerRoute from "./router/registerRoute.js";
import loginRoute from "./router/loginRoute.js";


const port=8000;
const app=express();

app.use(
    bodyParser.urlencoded({extended:true})
);
app.use(
    bodyParser.json()
)
app.use('/',registerRoute);
app.use('/',loginRoute);

app.get(
    "/",(req,res)=>{
        res.render("index.ejs");
    }
)

app.listen(port,(err)=>{
    if(err){
        console.log("Error: ", err);
    }
    else{
        console.log(`Server is running on ${port}`);
    }
})