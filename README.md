# OTP is a JavaScript One Time Password (OTP) Hook


## Main Function

 
    otp.generateOtp(options); // Generates an OTP with a key
    otp.validateOtp(key,otp); // Validates an OTP with the key provided
    

Options can have the following properties:

 
 * **otpLength**: The size of the OTP-Key (default 4)
 * **otpType**: The type of the code generated viz alphanumeric,alphabetic,numeric,hex (default numeric)
 * **otpExpiryTime**: The Expiry time for the generated code (default 15)
 

Applications can enable the hooks in the developer application by downloading the source code template from here;
inject the code in the application to call the OTP in an orderly fashion. It can be made as a prehook or posthook
Prehooks will be called before an event, onhook will be called during the event and post hook will be called post
the event. The sequence will be called on successful response from the previous event. If there are any errors, 
the subsequent hooks will not be called.
