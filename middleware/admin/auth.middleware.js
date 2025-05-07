const systemConfig = require("../../config/systems");
const Accounts = require("../../model/account.model");

module.exports.requireAuth = async (req, res, next)=>{
    if(!req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
    else{
        console.log(req.cookies.token);
        const user = await Accounts.findOne({
            token: req.cookies.token
        });
        console.log(user);
        if(!user){
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        }
        else{
            next();
        }
        
    }
}