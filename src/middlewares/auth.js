
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next) => {
     try{
        const { token } = req.cookies;

        if(!token){
         return res.status(401).send("Please Login!");
        }

        const decodedObj = await jwt.verify(token, "DEV@TINDER2556");
        
        const { _id } = decodedObj;
      //   console.log(_id);
        const user = await User.findById(_id);

        if(!user){
         throw new Error("User not found");
        }
          
        req.user = user;
        next();
     }
     catch(err){
       res.status(400).send("ERROR: "+ err.message);
      }
};



// These authentication is only for pratice(which is related to app2.js)

// const AdminAuth= (req,res,next) =>{
//     console.log("checking authorized access");
//      const token="xyzkdmd";
//     const IsAuthorized = token === "xyz";
//      if(!IsAuthorized){
//         res.status(401).send("Unauthorized user");
//      }
//      else next();
// };

// const UserAuth= (req,res,next) =>{
//     console.log("checking authorized access");
//      const token="xyzsqz";
//     const IsAuthorized = token === "xyz";
//      if(!IsAuthorized){
//         res.status(401).send("Unauthorized user");
//      }
//      else next();
// }

module.exports = {
    userAuth,
};