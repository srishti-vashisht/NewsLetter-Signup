const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");      /*To make request to external server */
const https = require("https");

const app = express();        /*tells that we are making an express application*/


app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));                                /*Public folder has all static or remote files which needs to accessed on server, use static function from express to serve static files to server */


app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html");                    /*When home page is loaded - render signup.html page on website*/

})

app.post("/",function(req,res){

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.Email;

    var data={
        members:[
            {                                                         /*Taking reference from api doc,mailchimp*/ 
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }

    /*Need to convert the obtained Javascript object to flat pack JSON */

    var jsonData = JSON.stringify(data);     /*converting javascript object to String which is in format of JSON */  /*JSON data will be sent to Mailchimp*/

    /*Will make request to mailchimp server now , will post data to external resource */ 
     
                                            /*url is mailchimp server endpoint */
     const url = "https://us17.api.mailchimp.com/3.0/lists/879d62918c";       /*us-17 is server alloted to us out of 20  */

     const options ={                                           /*option is javascript object */
              method:"POST",
              auth :"Srishti:ba234c27c662811c98c8604b33b14ffc-us17"      /*for authentication give any styring as username and apikey as password */
                                                                /*if you want successful post request, therefore authentication reqd */
     }

     const request = https.request(url,options,function(response){           /*Get request to external mail chimp server */
                 
                if(response.statusCode=== 200){
                    res.sendFile(__dirname+"/success.html");
                }else{
                    res.sendFile(__dirname+'/failure.html');
                }
        
                      response.on("data",function(data){
                      console.log(JSON.parse(data));
                  })
     })
     

     request.write(jsonData);                                                           /*Inside write passing the json data to mailchimp server*/
     request.end();
     /*console.log(Email); */
})

app.post("/failure",function(req,res){ 
    res.redirect("/");                                    /*on failure redirect to home route */
})

/* api key
ba234c27c662811c98c8604b33b14ffc-us17
*/
/* List id
879d62918c */

app.listen(3000,function(req,res){
    console.log("Server is running on port 3000");
})

