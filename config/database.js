const mongoose  = require("mongoose");

module.exports.connect = async () =>{
    try {
        await mongoose.connect(process.env.Database);
        console.log("connect Success");
        console.log("Database URL:", process.env.Database);
    }catch (error) {
        console.log("Error");
    }
}