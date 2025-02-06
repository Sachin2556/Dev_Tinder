const express= require("express");
const connectDB = require("./config/database");
const app=express();
const User = require("./models/user");

// read the data request which comes direct from body of postman api
app.use(express.json());   // express.json used as a middleware (which run for all routes)

app.post("/signup",async (req,res) =>{
    // create a request dynamic (direct body se data aa jayee)
    const user1= new User( req.body );
   
    

    // Creating a new instance of the User model
    const user =new User({
        firstname: "Hritik",
        lastname : "roshan",
        emailId : "ritikroshan1234@gmail.com",
        password: "king@123"
    });
   try{
    await user1.save();
    // await user.save();
    res.send("User Added successfully");
   }
   catch(err){
      res.status(400).send("Error saving the user : " + err.message);
   }
    
})


//  Get user by email
app.get("/user", async(req,res) => {

    const userEmail = req.body.emailId;
    // console.log(userEmail);
    try{
        const users =await User.find({ emailId: userEmail});
        if(users.length===0) {
            res.status(404).send("User not found");
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
})


// complete feed print in postman api(get all users from our database)
app.get("/feed", async(req,res) => {

   
    try{
        const users =await User.find({});
       
            res.send(users);
        
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
})

// delete a user from database
app.delete("/user", async(req,res) => {
    
    const userId= req.body.userId;
   
    try{
        const users =await User.findByIdAndDelete(userId);
       
            res.send("User deleted successfully");
        
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
})

//update a user from database
app.patch("/user/:userId", async(req,res) => {
    
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES = [
            "userId",
            "photoUrl",
            "age",
            "gender",
            "skills",
        ];

        const isUpdateAllowed = Object.keys(data).every((k) => 
                ALLOWED_UPDATES.includes(k)
        );

        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }

         if(data?.skills.length>10){
            throw new Error("Skills cannot be more than 10");
         }
        // const user =await User.findByIdAndUpdate(userId,data);
        const user =await User.findByIdAndUpdate({_id:userId}, data,
                                                 {
                                                     returnDocument : "before",
                                                      runValidators : true ,
                                                });
        console.log(user);
        res.send("Update data successfully");
    }
    catch(err){
        res.status(400).send("Updated failed : " + err.message);
    }
})


connectDB()
    .then(()=>{
        console.log("Database connection established");
        app.listen(3003, ()=> {
            console.log("Server is Successfully listening on port 3003...");
        });
    })

    .catch((err)=>{
        console.error("Database cannot be connected!!");
    });

   
