
const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
       "mongodb+srv://sachinraj:M9v8MjOtgwnWH0Ph@namastenode.3ochj.mongodb.net/Project1?retryWrites=true&w=majority"

    );
};

module.exports=connectDB;
