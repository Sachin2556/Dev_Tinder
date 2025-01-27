const express = require('express');

const app=express();

const {AdminAuth, UserAuth}= require('./middlewares/auth')
// Importance of middleware => next() function

// check each routes which is start from admin
app.use("/admin",AdminAuth);

app.get("/user",UserAuth,(req,res) => {
    res.send("Get user data");
});

app.get("/admin/getUser",(req,res) =>{
    res.send("Get all data");
});

app.get("/admin/deleteUser",(req,res) =>{
    res.send("Delete all data");
})


// Error Handling concept
app.get("/xyz",(req,res) =>{
    throw new Error("hnclscmd");
    res.send("Delete all data");
})

//   "/" it handles error of all routes 
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong");
    }
})





// app.use("/",(req,res,next)  => {
    
//     console.log("Middleware");
//     // res.send("1st Response!!")
//     next();
// });


// // multiple route handler possible here
// app.get("/user",(req,res,next)  => {
//     //    route handler 1
//     console.log("Route handler 1");
//     // res.send("1st Response!!")
//     next();
// }, (req,res,next) => {
//     console.log("Route handler 2");
//     res .send("2nd Response!!");
//     // next();
// });

app.listen(3002, ()=> {
         console.log("Server is Successfully listening on port 3002...");
    });