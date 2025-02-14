const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { model } = require("mongoose");

const USER_SAFE_DATA = "firstname lastname photoUrl age gender about skills" 
// Get all the pending connection request for the loggedin user
userRouter.get("/user/requests/received", userAuth , async(req,res) =>{

    try{

       const loggedInUser = req.user;
       const connectionRequest = await ConnectionRequest.find({
           toUserId : loggedInUser._id,
            status : "interested",       // only interseted profile we get
       }).populate("fromUserId", "firstname lastname gender")    
    //    }).populate("fromUserId" , ["firstname", "lastname"]);

//  populate is much popular because by the help of ref(which is used to join two schema),
//    it gets all schema of user as place of id 

       res.json({message: "Data fetched successfully",
        data: connectionRequest,
       });
    }
    catch(err){
        res.status(404).send("ERROR: "+ err.message);
    }
});


userRouter.get("/user/connections", userAuth , async(req,res) =>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { toUserId : loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted"},
            ],
           
        })
           .populate("fromUserId" , USER_SAFE_DATA)
           .populate("toUserId" , USER_SAFE_DATA);

        const data = connectionRequest.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return  row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({ data });
    }
    catch(err){
        res.status(404).send("ERROR " + err.message);
    }
})




module.exports = userRouter;