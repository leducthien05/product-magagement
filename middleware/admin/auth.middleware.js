const systemConfig = require("../../config/systems");
const Accounts = require("../../model/account.model");
const Roles = require("../../model/role.model");


module.exports.requireAuth = async (req, res, next)=>{
    if(!req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
    else{
        const user = await Accounts.findOne({
            token: req.cookies.token
        }).select("-password");//lấy thông tin nhưng không láy password
        if(!user){
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        }
        else{
            const role = await Roles.findOne({
                _id: user.roles_ID
            });
            res.locals.role = role;
            res.locals.user = user;
            next();
        }
        
    }
}