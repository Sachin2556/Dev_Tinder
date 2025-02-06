
const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://sachinraj:password@namastenode.3ochj.mongodb.net/name"
    );
};

module.exports=connectDB;
