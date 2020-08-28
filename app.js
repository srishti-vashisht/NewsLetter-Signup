const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();        /*tells that we are making an express application*/


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.send("Welcome");

})


app.listen(3000,function(req,res){
    console.log("Server is running on port 3000");
})

