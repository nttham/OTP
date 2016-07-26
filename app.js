/**
 * Created by 423919 on 5/26/2016.
 * Sample app created to demonstrate how the OTP can be hooked to any micro 
 * services
 */
var express = require('express');
var app = express();
// here we are hooking the otp with this app

console.log("facebookObjStr ********* without parse "+process.env.facebookObjStr);

console.log("facebookObjStr ********* withparse  "+JSON.parse(process.env.facebookObjStr));


var port = process.env.VCAP_APP_PORT || 3000;
//started a server which is listening on port 
app.listen(port);
console.log('Otp Server is listening on port ' + port);


