/**
 * Created by 423919 on 5/18/2016.
 * This is the Otp module which generate a token and validate the same
 */

var crypto = require('crypto');
var cipherPwd = 'oyeilyodd';
var encryptionType = 'aes192';
var randomString = require("randomstring");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var config = require('./config.json');
var Otp = function () {

};


// This api is use to generate an OTP based on the length,type and expiry
// time

Otp.prototype.generateOtp = function (app) {

    app.post("/generate", jsonParser, function (req, res) {

        var otpOptions = {};
        otpOptions.length = (config.otp && config.otp.otpLength) ? config.otp.otpLength : 4;
        otpOptions.charset = (config.otp && config.otp.otpType) ? config.otp.otpType : 'numeric';
        var expiryTime = (config.otp && config.otp.otpExpiryTime) ? config.otp.otpExpiryTime : 10;
        var otpCode = randomString.generate(otpOptions);
        // generate a secretKey for Otp with otp and OTP generated Time
        var otpGenTime = Date.now();
        var otpExpiryTime = otpGenTime + (expiryTime * 60000);
        var secretData = otpCode + '-' + otpExpiryTime;

        // encrypting the secretData
        var cipher = crypto.createCipher(encryptionType, cipherPwd);
        var encrypted = cipher.update(secretData, 'utf8', 'hex');
        encrypted += cipher.final('hex');


        if (config.channel === 'twilio') {

            var twilio = require("./twilioservice.js");
            var twilioObj = new twilio();
            var msgObj = {
                "accountSID": config.twilio.accountSID,
                "authToken": config.twilio.authToken,
                "to": config.twilio.toRecipient,
                "from": config.twilio.fromNo,
                "body": "OTP pin is " + otpCode

            };
            twilioObj.sendMessage(msgObj, function (err, result) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                if (err) {

                    res.send(JSON.stringify(err), 400);
                }
                else {
                    var resObj = {
                        otpCode: otpCode,
                        otpKey: encrypted
                    };

                    res.send(JSON.stringify(resObj), 200);
                    //  res.send(200);
                    //   res.send("OTP send successfully", 200);
                    //res.end();

                }

            });
        } else if (config.channel === 'sendgrid') {
            var sendmailObj = new require("./sendgridservice.js")();
            var msgObj = {
                "accountSID": config.sendgrid.accountSID,
                "authToken": config.sendgrid.authToken,
                "toRecipient": config.sendgrid.toRecipient,
                "fromMail": config.sendgrid.fromMail,
                "subject": "Please find the otp",
                "text": "OTP pin is " + otpCode
            };
            sendmailObj.sendMail(msgObj, function (err, result) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                if (err) {
                    res.send(JSON.stringify(err), 400);
                }
                else {

                    res.send("OTP send successfully", 200);

                }
            });
        }


    });
};

// This api is used to validate the otp given by the user,
// with the key
Otp.prototype.validateOtp = function (app) {

    app.post("/validate", jsonParser, function (req, res) {


        var decipher = crypto.createDecipher(encryptionType, cipherPwd);
        var encrypted = req.body.otpKey;
        // decrypting the key to get the OTP and expiry time which comes in "OTP-EXPIRYTIME" format
        var decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        // spliting the "OTP-EXPIRYTIME" format decrrypt data to get otp and expiry time
        var splitedSecretData = decrypted.split('-');
        var status = {};
        var currentTime = Date.now();
        if (req.body.otpCode === splitedSecretData[0] && splitedSecretData[1] > currentTime) {
            status.status = "OTP is validated successfully";
        } else {
            status.status = "OTP validation failed ";
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(JSON.stringify(status), 200);


    });
};

module.exports = Otp;