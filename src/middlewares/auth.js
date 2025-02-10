
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const UserAuth = async (req,res,next) => {
     try{
        const { token } = req.cookies;

        if(!token){
         throw new Error("Token is not valid!!!");
        }

        const decodedObj = await jwt.verify(token, "DEVTINDER@2556");

        const { _id } = decodedObj;
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
    UserAuth,
};