const twilio = require('twilio');
const http = require('http');
const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3000;

const config = require('./config');

// Twilio Credentials 
const client =twilio(config.accountSid, config.authToken);

const app = express()  

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: "12345"
}, app).listen(port);

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/', (request, response) => {  
  const dat = request.body;
  sendSms(dat.number, "Just looked at "+dat.name);
  response.json({hello:"world"});
})

app.get('/', (request, response)=> {
  response.json({hello:"world"});
});

function sendSms(to, message){
  client.messages.create({ 
      to: to,
      from: config.fromNumber, 
      body: message
  }, function(err, message) { 
    // console.log(err);
    // console.log(message);
  });
};

// app.listen(port, (err) => {  
//   if (err) {
//     return console.log('something bad happened', err)
//   }

//   console.log(`server is listening on ${port}`)
// })


 
// //require the Twilio module and create a REST client 
// var client = require('twilio')(accountSid, authToken); 
 
