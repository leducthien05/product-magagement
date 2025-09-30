const User = require("../../model/users.model");
const PasswordForgot = require("../../model/passwordForgot.model");
const Cart = require("../../model/cart.model");

const md5 = require('md5');
const generateHelper = require("../../helper/generate");
const sendMailHelper = require("../../helper/nodemailer");

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


    const result = await Cart.findOne({
        userID: user._id
    });

    if(result){
        res.cookie("cartID", result._id);
    }else{
        await Cart.updateOne({
            _id: req.cookies.cartID
        }, {userID: user._id})
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

module.exports.passwordForgot = async (req, res)=>{
    res.render("client/page/user/passwordForgot", {
        titlePage: "Quên mật khẩu"
    });
}

module.exports.passwordForgotPost = async (req, res)=>{
    const email = req.body.email;
    
    const user = await User.findOne({
        email: email
    });
    
    if(!user){
        req.flash("error", "Email không tồn tại");
        res.redirect("back");
        return;
    }

    const otp = generateHelper.generateRandomNumber(6);

    const objectPasswordForgot = {
        email: email,
        otp: otp,
        expiresAt: Date.now() + 120000
    }

    const forgot = new PasswordForgot(objectPasswordForgot);
    forgot.save();

    const subject = "Mã OTP xác nhận lấy lại mật khẩu";
    const html = `Mã OTP để lấy lại mật khẩu là: <b>${otp}</b>.
    Chỉ có hiệu lực trong 2 phút!`

    //Khi nhập đúng email
    sendMailHelper.sendMail(email, subject, html);
    res.redirect(`/user/password/otp?email=${email}`);
}

module.exports.passwordOtp = async (req, res)=>{
    const email = req.query.email;
    res.render("client/page/user/otpPassword", {
        titlePage: "Xác nhận OTP",
        email: email
    })
}

module.exports.passwordOtpPost = async (req, res)=>{
    const email= req.body.email;
    const otp = req.body.otp;
    
    const result = await PasswordForgot.findOne({
        email: email,
        otp:otp
    });

    if(!result){
        req.flash("error", "Mã xác thực không chính xác");
        res.redirect("back");
        return;
    }

    const user = await User.findOne({
        email: email
    });

    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/user/password/reset");
}

module.exports.resetPassword = async (req, res)=>{
    res.render("client/page/user/resetPassword", {
        titlePage: "Thay đổi mật khẩu"
    })
}

module.exports.resetPasswordPost = async (req, res)=>{
    const password = req.body.password;

    await User.updateOne({
        tokenUser: req.cookies.tokenUser
    }, {
        password: md5(password)
    });

    res.redirect("/");
}

module.exports.info = async (req, res)=>{
    const tokenUser = req.cookies.tokenUser;
     
    const user = await User.findOne({
        tokenUser: tokenUser
    }).select("-password");

    res.render("client/page/user/info", {
        titlePage: "Thông tin cá nhân",
        user: user
    });
}