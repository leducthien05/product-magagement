const systemConfig = require("../../config/systems");
const User = require("../../model/users.model");

module.exports.requireAuth = async (req, res, next)=>{
    if(!req.cookies.tokenUser){
        res.redirect(`/user/login`);
    }
    else{
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser
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