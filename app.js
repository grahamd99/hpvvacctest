console.log('No value for FOO yet:', process.env.Bearer);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log('Now the value for Bearer is:', process.env.Bearer);

var fs         = require('fs'),
    util       = require('util'),
    //xml2js   = require('xml2js'),
    express    = require("express"),
    bodyParser = require("body-parser")
    request    = require('request');
    require('dotenv').config();
    ;
 
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

const options = {
  url: 'https://demo3631513.mockable.io/FHIR/R4/Immunization%3Fpatient.identifier=https://fhir.nhs.uk/Id/nhs-number%7C9000000009&procedure-code:below=90640007',
  headers: {
              'accept': 'application/fhir+json',
              'Authorization': 'Bearer ' + process.env.Bearer,
              'fromASID': '200000000117',
              'toASID': '999999999999'
  }
}

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {


    // https://stackoverflow.com/questions/11922383/how-can-i-access-and-process-nested-objects-arrays-or-json -
    const info = JSON.parse(body);

//var numberOfResources = info.entry.length - 1;
var numberOfResources = info.entry.length;
console.log("numberOfResources : " + numberOfResources);
console.log("type : " + typeof numberOfResources);

    //console.log( info );
    console.log("pointer fullUrl : " + info.entry[0].fullUrl);
    console.log("resource type type: " + info.entry[0].resource.resourceType);
    console.log("SNOMED code: " + info.entry[0].resource.extension[0].valueCodeableConcept.coding[0].code);
    console.log("SNOMED display: " + info.entry[0].resource.extension[0].valueCodeableConcept.coding[0].display);


    global.vaccineProcedureCode    = info.entry[0].resource.extension[0].valueCodeableConcept.coding[0].code;
    global.vaccineProcedureDisplay = info.entry[0].resource.extension[0].valueCodeableConcept.coding[0].display;
    global.vaccineCodeSNOMED       = info.entry[0].resource.vaccineCode.coding[0].code;
    global.vaccineCodeDisplay      = info.entry[0].resource.vaccineCode.coding[0].display;



   }
  else {
  console.log( "Things did not work :" + response)
  }
}

request(options, callback);


app.get("/",function(req,res){
  res.render("home");
});

app.listen(port, () => console.log("Server started and listening on port " + port ));