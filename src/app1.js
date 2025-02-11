const express = require('express');

// create a server which is listen on 3000
const app = express();

// query params
app.get("/user/:userid/:name/:password",(req,res) => {
    // we write any id in postman api which reflects here by query params
    console.log(req.params);
    res.send({ firstName: "Sachin" , lastName: "Kumar"});
});

// app.get("/user",(req,res) => {
//     // we write any id in postman api which reflects here by query params
//     console.log(req.query);
//     res.send({ firstName: "Sachin" , lastName: "Kumar"});
// });



// play with these regix
app.get("/a?c",(req,res) => {
    res.send("King Coming ");
});


//  This will handle only get call
// app.get("/user",(req,res) => {
//     res.send({ firstName: "Sachin" , lastName: "Kumar"});
// });


app.post("/user",(req,res) => {
    res.send("Data saved successfully into database");
});


app.delete("/user",(req,res) => {
    res.send("Delete Data successfully");
});








//  anything which comes after / is same as this , so it never see any result when we write /test or /hello (it always show Namaste.....)
// app.use("/", (req,res) => {
//     res.send("Namaste from the dashboard ");
// });


// //  anything which comes after /test is same as this 
app.use("/test",(req,res) => {
    res.send("Hello from the server");
});

// //  anything which comes after /hello is same as this 
app.use("/hello",(req,res) => {
    res.send("Hello Hello Hello");
});

// sequence of code matter , here  /test and /hello will wroking
// without any request
app.use("/", (req,res) => {
    res.send("Namaste from the dashboard ");
});

// app.listen(3000, ()=> {
//      console.log("Server is Successfully listening on port 3000...");
// });


// we run this server with two method : both are write in package.json in scripts section 
//  1. npm run dev 
//  2. npm run start 