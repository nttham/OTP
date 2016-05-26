# OTP is a JavaScript One Time Password (OTP) Hook


## Main Function

 
    otp.generateOtp(options); // Generates an OTP with a key
    otp.validateOtp(key,otp); // Validates an OTP with the key provided
    

Options can have the following properties:

 
 * **otpLength**: The size of the OTP-Key (default 4)
 * **otpType**: The type of the code generated viz alphanumeric,alphabetic,numeric,hex (default numeric)
 * **otpExpiryTime**: The Expiry time for the generated code (default 15)
 

To use this module you have to instantiate the otp.js and can call generateOtp and validateOtp using the router,
also you have to provide the proper config.json with the dynamic values of options which will be taken from the 
developer app.
