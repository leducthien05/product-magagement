const systemConfig = require("../../config/systems");
const User = require("../../model/users.model");

module.exports.requireAuth = async (req, res, next)=>{
    if(!req.cookies.token){
        res.redirect(`/user/login`);
    }
    else{
        const user = await User.findOne({
            token: req.cookies.token
        }).select("-password");//lấy thông tin nhưng không láy password
        if(!user){
            res.redirect(`/user/login`);
        }
        else{
            res.locals.user = user;
            next();
        }
        
    }
}