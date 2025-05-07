const Accounts = require("../../model/account.model");
const md5 = require("md5");
const systemConfig = require("../../config/systems");


module.exports.login = async (req, res)=>{
    console.log(req.cookies.token);
    if(req.cookies.token){
        const user = await Accounts.findOne({
            token: req.cookies.token
        });
        if(user){
            res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
        }
        else{
            res.render("admin/page/auth/login", {
            titlePage: "Đăng nhập"
        });
        }
    }
    else{
        res.render("admin/page/auth/login", {
            titlePage: "Đăng nhập"
        });
    } 
}

module.exports.loginAccount = async (req, res)=>{
    try {
        // Mã hóa mật khẩu nhập vào
        const email = req.body.email;
        const password = req.body.password;
        const find = {
            deleted: false,
            email: email
        };
        const user = await Accounts.findOne(find);
        if (!user) {
            req.flash("error", "Email không tồn tại");
            res.redirect("back");
            return;
        }

        if(md5(password) != user.password){
            
            req.flash("error", "Sai mật khẩu");
            res.redirect("back");
            return;
        }

        if(user.status != "active"){
            req.flash("error", "Tài khoản đã bị khóa");
            res.redirect("back");
            return;
        }

        res.cookie("token", user.token);
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
        
    } catch (error) {
        console.error(error); // Ghi log lỗi ra console
        res.status(500).send("Đã xảy ra lỗi máy chủ.");
    }
}   

module.exports.logout = async (req, res)=>{
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);

}
