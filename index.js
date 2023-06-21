const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

require("dotenv").config()
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use("/public", express.static('public')); 

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
})
app.get("/hello.html", function (req, res) {
    res.sendFile(__dirname+"/hello.html"); 
    
});
app.get("/", function (req, res) {
    res.sendFile(__dirname+"/index.html"); 
    
});
app.get("/work.html", function (req, res) {
    res.sendFile(__dirname+"/work.html"); 
    
});

app.post("/hello.html", function (req, res) {
    nm = req.body.name;
    email = req.body.email;
    msg = req.body.msg;

    const mailOptions = {
    from: email,
    to: 'hassaankh8@gmail.com',
    subject: 'Portfolio Email',
    text: nm +"\n"+ email +"\n"+ msg
    };

    transporter.sendMail(mailOptions, function(error,info){
        if(error){
            console.error();
        }
        else{
            console.log("Email Sent: " + info.response);
        }
    });

    return res.redirect('/hello.html');
});


app.listen(process.env.PORT || 5500, function () {
    console.log("localhost:5500");
});