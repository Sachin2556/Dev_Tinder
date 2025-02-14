const express = require("express");
const User = require("../models/user");
const {validateSignupData} = require("../utils/validation");
const authRouter = express.Router();
const bcrypt = require("bcrypt"); 
const cookies_parser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth")

authRouter.use(cookies_parser()) ;

authRouter.post("/signup",async (req,res) =>{


    try{
          // Validation of datya
           validateSignupData(req);
         
           const { firstname , lastname , emailId , password } = req.body;
         //   Encrypt the Password
         // salt mix with my password and make it strong (10 means it mix salt and password in 10 rounds )
         const passwordHash = await bcrypt.hash(password, 10);
        //  console.log(passwordHash);

          const user = new User({
             firstname,
             lastname,
             emailId,
             password : passwordHash,
          });
 
     await user.save();
     res.send("User Added successfully");
    }
    catch(err){
       res.status(400).send("ERROR : " + err.message);
    }
     
 })

authRouter.post("/login", async(req,res) =>{

    try{

         const {emailId, password} = req.body;

         const user= await User.findOne({ emailId : emailId});
         if(!user){
            throw new Error("Invalid Credentials");
         }

         const isPasswordValid = await user.validatePassword(password);
         if(isPasswordValid){

            // Create JWT token                               // secret key
             const token = await user.getJWT();
            // Add the token to cookie and send the response back to the user
            res.cookie("token", token , {
                expires : new Date(Date.now() + 8*3600000),  //cookies expires in 8 days
            });//just explore cookies.parser
            res.send("Login Successfully");
         }
         else{
            throw new Error("Invalid Credentials"); 
         }
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
     }
})

authRouter.post("/logout", async(req,res) =>{
     
    res.cookie("token",null, {
        expires : new Date(Date.now()),
    });

    res.send("Logout Successfully!!");
   
});



 module.exports = authRouter;