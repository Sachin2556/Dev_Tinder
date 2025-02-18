const express= require("express");
const connectDB = require("./config/database");
const cookies_parser = require("cookie-parser");
const cors = require("cors");
const app=express();


app.use(
    cors({
        origin: "http://localhost:5173",
        credentials : true,
    })
); // it handle the cors which is commes from when we connect react to node.js on browser
app.use(cookies_parser()) 
app.use(express.json());   

const authRouter = require("./routes/auth");
const profileRouter  =require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/",userRouter);

connectDB()
    .then(()=>{
        console.log("Database connection established");
        app.listen(7777, ()=> {
            console.log("Server is Successfully listening on port 7777...");
        });
    })

    .catch((err)=>{
        console.error("Database cannot be connected!!");
    });

   
