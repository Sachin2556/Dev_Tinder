const express= require("express");
const connectDB = require("./config/database");
const app=express();
const User = require("./models/user");
const {validateSignupData} = require("./utils/validation");
const cookies_parser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth")

const bcrypt = require("bcrypt"); // npm i bcrypt (for encryption our password)
// read the data request which comes direct from body of postman api
app.use(express.json());   // express.json used as a middleware (which run for all routes)
// whenever we reading a request , express.json() parsed data into json format and then we get it.

app.use(cookies_parser())  //read all cookies 


app.post("/signup",async (req,res) =>{

    // create a request dynamic (direct body se data aa jayee)
    // const user1= new User( req.body );
   
    // // Creating a new instance of the User model
    // const user =new User({
    //     firstname: "Hritik",
    //     lastname : "roshan",
    //     emailId : "ritikroshan1234@gmail.com",
    //     password: "king@123"
    // });


   try{
         // Validation of datya
          validateSignupData(req);
        
          const { firstname , lastname , emailId , password } = req.body;
        //   Encrypt the Password
        // salt mix with my password and make it strong (10 means it mix salt and password in 10 rounds )
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

          // Creating a new instance of the User model
        //   This is not way to extract field from database
        // const user= new User( req.body );

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

app.post("/login", async(req,res) =>{

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

// get profile
app.get("/profile",userAuth, async(req,res) =>{
   try{
       const user = req.user;  //from userAuth , we get user alreadyyy
    //   console.log(user);
       res.send(user);
   }
   catch(err){
    res.status(401).send("ERROR : " + err.message);
   }
})

app.post("/sentConnectionRequest", userAuth , async(req,res) => {
     const user= req.user;

    //  sending a connection request
    console.log("Sending a connection request");

    res.send(user.firstname + " sent the connection request"); 
});

app.get("/receiveConnectionRequest", userAuth , async(req,res) => {
    const user= req.user;

   //  receiving a connection request
   console.log("Receiving a connection request");

   res.send("Receiving the connection request from " + user.firstname); 
});


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

   
