const express = require("express");
const bodyParser = require("body-parser");
const request = require("request")
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
});
app.post("/",function(req,res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : fname,
                    LNAME : lname
                }
            }
        ]
    };
      const jsonData = JSON.stringify(data);
      const url = "https://us6.api.mailchimp.com/3.0/lists/78f8e0e77f";
      const options = {
          method : "POST",
          auth : "Shivaditya kr:0e23172af5ba8220bab62c5140f7e346-us6",
      }
      const request = https.request(url, options, function(response){
         
        if (response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
              console.log(JSON.parse(data));
          })

      });
      //request.write(jsonData);
      request.end();    
});
app.post("/tryagain",function(req,res){
    res.redirect("/");
})
app.listen(3000, ()=>{
    console.log("Server Started");
});

//Api ket : 0e23172af5ba8220bab62c5140f7e346-us6
//78f8e0e77f