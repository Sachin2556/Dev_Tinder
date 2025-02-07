const mongoose = require("mongoose");
const validator = require("validator")  //read validator from documents (search validator library)

const userSchema = mongoose.Schema({

       firstname: {
           type:String,
           required:true,
           minLength : 4,
           maxLength : 50,
       },

       lastname: {
          type: String,

       },


    //    here required scheme is used to ensure that required field is must write in database without this ,we can't insert any data in database
    //  unique schema is used for insert data into database in unique behaviour (same emailid can't insert in database)
       emailId:{
        type:String,
        required : true,
        unique : true,
        lowercase : true, // automatic all keywords insert in lowercase in emaild in database
        trim : true,       // trim blank spaces("    rajsachin805130@gmail.com     ")
        validate(value){
            if(!validator.isEmail(value)){
                 throw new Error("Invalid email address :" + value);
            }
         },
       },

       password: {
          type: String,
          validate(value){
            if(!validator.isStrongPassword(value)){
                 throw new Error("Enter a Strong Password :" + value);
            }
         },
       },

       age : {
           type: Number,
           min : 18,
           max : 50,
       },

       gender : {
           type : String,
           validate(value){
              if(!["male", "female", "others"].includes(value)){
                   throw new Error("Gender data is not valid");
              }
           }
       },

       photoUrl : {
         type : String,
         validate(value){
            if(!validator.isURL(value)){
                 throw new Error("Wrong URL:" + value);
            }
         },
       },

    //    by default it's always push with any data
       about : {
          type : String,
          default : "This is a default about of the user!"
       },

       skills : {
           type : [String],
       },
   },
   {
    timestamps : true,
   }
   

);

module.exports = mongoose.model("User",userSchema);