const express = require('express');

// create a server which is listen on 3000
const app = express();

app.use("/test",(req,res) => {
    res.send("Hello from the server");
});

app.use("/hello",(req,res) => {
    res.send("Hello Hello Hello");
});

// without any request
app.use("/", (req,res) => {
    res.send("Namaste from the dashboard ");
});

app.listen(3000, ()=> {
     console.log("Server is Successfully listening on port 3000...");
});