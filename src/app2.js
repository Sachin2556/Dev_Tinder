const express = require('express');

const app=express();

// multiple route handler possible here
app.get("/user",(req,res,next)  => {
    //    route handler 1
    console.log("Route handler 1");
    // res.send("1st Response!!")
    next();
}, (req,res,next) => {
    console.log("Route handler 2");
    // res .send("2nd Response!!");
    next();
});

app.listen(3002, ()=> {
         console.log("Server is Successfully listening on port 3002...");
    });