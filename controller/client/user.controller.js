const User = require("../../model/users.model");
const md5 = require('md5');

module.exports.register = async (req, res)=>{
    res.render("client/page/user/register", {
        titlePage: "Đăng ký"
    });
}

module.exports.addUser = async (req, res)=>{
    const fullname = req.body.fullname;
    const email = req.body.email;
    const exitEmail = await User.findOne({
        email: email
    });

    if(exitEmail){
        req.flash("error", "Email đã tồn tại");
        res.redirect("back");
        return;
    }

    req.body.password = md5(req.body.password);
    const userInfo = {
        fullname: fullname,
        email: email,
        password: req.body.password
    };
    const user = new User(userInfo);
    await user.save();
    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
}

module.exports.login = async (req, res)=>{
    if(req.cookies.tokenUser){
        res.clearCookie("tokenUser");
    }

    res.render("client/page/user/login", {
        titlePage: "Đăng nhập"
    })
}

module.exports.loginPost = async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    //Kiểm tra email
    if(!user){
        req.flash("error", "Email không tồn tại");
        res.redirect("back");
        return;
    }

    //Kiểm tra mật khẩu
    if(md5(password) !== user.password ){
        req.flash("error", "Mật khẩu sai");
        res.redirect("back");
        return;
    }

    //Kiểm tra trạng thái tài khoản
    if(user.status == "inactive"){
        req.flash("error", "Tài khoản bị khóa");
        res.redirect("back");
        return;
    }
    
    //Gán token 
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}

module.exports.logout = async (req, res)=>{
    res.clearCookie("tokenUser");
    res.clearCookie("cartID");
    res.redirect("/");
}