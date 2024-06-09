const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/index",express.static("index"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root" , 
    password: "aayushi",
    database: "nodejs"
});

// connect to the database
connection.connect(function(error){
    if(error) throw error
    else console.log("connected to trhe database sucessfully!")
})

app.get("/", function(req,res){

  res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder,function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,result,fields){
          if(result.length > 0){
            res.redirect("/welcome");
          }else{
            res.redirect("/");
          }
          res.end();
    })
})

//when login is sucess

app.get("/welcome",function(eq,res){
    res.sendFile(__dirname + "index/welcome.html")
})

// set app port

app.listen(4000);