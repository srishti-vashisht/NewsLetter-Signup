const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();        /*tells that we are making an express application*/


app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));                                /*Public folder has all static or remote files which needs to accessed on server, use static function from express to serve static files to server */


app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html");                    /*When home page is loaded - render signup.html page on website*/

})

app.post("/",function(req,res){

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var Email = req.body.Email;
    console.log(mail);
})

/*
ba234c27c662811c98c8604b33b14ffc-us17

app.listen(3000,function(req,res){
    console.log("Server is running on port 3000");
})

