
const validator = require("validator");

const validateSignupData = (req) =>{
    const { firstname, lastname, emailId, password} =req.body;

    if(!firstname || !lastname){
        throw new Error("Enter your Name");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a strong Password")
    }
    
}

module.exports = {
    validateSignupData,
};