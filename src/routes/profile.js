const express = require("express");
const profileRouter = express.Router();
const {validateEditProfileData} = require("../utils/validation");

const { userAuth  } = require("../middlewares/auth")

profileRouter.get("/profile/view",userAuth, async(req,res) =>{
    try{
        const user = req.user;  //from userAuth , we get user alreadyyy
     //   console.log(user);
        res.send(user);
    }
    catch(err){
     res.status(401).send("ERROR : " + err.message);
    }
 })

 profileRouter.patch("/profile/edit" ,userAuth , async(req,res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user;

        
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    
        await loggedInUser.save();
    
        res.json({
          message: `${loggedInUser.firstName}, your profile updated successfuly`,
          data: loggedInUser,
        });
    }
    catch(err){
        res.status(405).send("ERROR : " + err.message);
    }
      
 });


 module.exports = profileRouter;