const express= require("express");
const connectDB = require("./config/database");
const app=express();

app.use(express.json());   

const authRouter = require("./routes/auth");
const profileRouter  =require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");


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

   
