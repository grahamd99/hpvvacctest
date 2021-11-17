var fs      = require('fs'),
    util    = require('util'),
    //xml2js  = require('xml2js'),
    express = require("express"),
    bodyParser = require("body-parser");
 
//var parser = new xml2js.Parser();
var app = express();
var port = 3000;
//var fileToParse = "./public/examples/digimeds_example1.xml";

// Serve Static Assets
app.use(express.static("public"));
// Virtual Path Prefix '/static'
app.use('/static', express.static('public'))

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/",function(req,res){
  res.render("home");
});

app.listen(port, () => console.log("Server started and listening on port " + port ));