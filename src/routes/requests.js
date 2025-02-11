const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth")

requestRouter.post("/sentConnectionRequest", userAuth , async(req,res) => {
    const user= req.user;

   //  sending a connection request
//    console.log("Sending a connection request");

   res.send(user.firstname + " sent the connection request"); 
});

module.exports = requestRouter;