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


userRouter.get("/feed" , userAuth , async(req,res) => {
    try{
        /*User should see all the user cards expect:
           0.  his own card
           1. his connections 
           2. ignored people
           3. already sent the connection request
        */

           const loggedInUser= req.user;

        //    pagination
          const page = parseInt(req.query.page) || 1;
          let limit = parseInt(req.query.limit) || 10;

          limit = limit > 50 ? 50 : limit;
          
          const skip = (page-1) * limit;
        //    find all connection requests(setn+received)
        const connectionRequest = await ConnectionRequest.find({
            $or: [{ fromUserId : loggedInUser._id} , { toUserId: loggedInUser._id}],
        })
          .select("fromUserId  toUserId status")
        
        //   all four conditions userid comes in set
          const hideUsersFromFeed = new Set();
          connectionRequest.forEach((req) => {
             hideUsersFromFeed.add(req.fromUserId.toString());
             hideUsersFromFeed.add(req.toUserId.toString());
          })

            // console.log(hideUsersFromFeed);

        const users = await User.find({
            $and:[
               { _id: { $nin: Array.from(hideUsersFromFeed)} },
               { _id: { $ne: loggedInUser._id}},  //dont need of this because fromuserid is also present in set
            ],
            
        })
           .select(USER_SAFE_DATA)
           .skip(skip)
           .limit(limit);

        // res.send(users);
        res.json({ data: users});
    }
    catch(err){
         res.status(404).json({message: err.message});
    }
})

module.exports = userRouter;