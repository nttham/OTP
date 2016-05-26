/**
 * Created by 423919 on 5/26/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// create application/json parser

var jsonParser = bodyParser.json();
var otp = require('./otp.js');
var otpObj = new otp();
otpObj.generateOtp(app);
otpObj.validateOtp(app);
var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('Otp Server is listening on port ' + port);


