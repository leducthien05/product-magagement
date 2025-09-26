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