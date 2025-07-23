
const validator = require("validator");

const validateSignupData = (req) =>{
        // console.log(req);
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

const validateEditProfileData  = (req) =>{
      
    const AllowedUpdates = [
        "firstname",
        "lastname",
        "emailId",
        "age",
        "photoUrl",
        "about",
        "gender",
        "skills"
    ];

     const isEditAllowed = Object.keys(req.body).every((field) => 
        AllowedUpdates.includes(field)
     );

    //  if(!isEditAllowed){
    //     throw new Error("Update not allowed");
    // }

    //  if(req.body?.skills.length>10){
    //     throw new Error("Skills cannot be more than 10");
    //  }

   return isEditAllowed;
};


module.exports = {
    validateSignupData,
    validateEditProfileData,
};