const mongoose  = require("mongoose");

module.exports.connect = async () =>{
    try {
        await mongoose.connect(process.env.Database);
        console.log("connect Success");
        
    }catch (error) {
        console.log(error);
        console.log("Error");
    }
}