const express = require("express");
const bodyParser = require("body-parser");
const mailgun = require("mailgun-js");

const app = express();
const mg = mailgun({apiKey: process.env.LINK , domain: process.env.DOMAIN});


app.use(bodyParser.urlencoded({extended: true}));
app.use("/public", express.static('public')); 


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

    const data = {
    from: process.env.FROM,
    to: process.env.EMAIL,
    subject: 'Portfolio Email',
    text: nm +"\n"+ email +"\n"+ msg
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
    return res.redirect('/');
});


app.listen(process.env.PORT || 5500, function () {
    console.log("Got it Back");
});