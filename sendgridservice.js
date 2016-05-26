/**
 * Created by 423919 on 5/23/2016.
 * This module is used to send email
 */

var config = require("./config.json");
var Sendmail = function () {

};

// this api will configure the sendgrid obj and send the sms
Sendmail.prototype.sendMail = function (mailObj, callback) {

    var sendgrid = require('sendgrid')(mailObj.accountSID, mailObj.authToken);
    var message = {
        "toRecipient": mailObj.toRecipient,
        "fromMail": mailObj.fromMail,
        "subject": mailObj.subject,
        "text": mailObj['text']
    };

    var email = new sendgrid.Email(message);

    sendgrid.send(email, function (error, message) {
        if (!error) {
            return callback(null, message);

        } else {
            return callback(error);
        }
    });
}

module.exports = Sendmail;