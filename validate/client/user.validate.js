module.exports.otp = (req, res, next)=>{
    if(!req.body.otp){
        req.flash("error", "vui lòng nhập mã xác thực!");
        res.redirect('back');
        return;
    }

    next();
}

module.exports.resetPassword = (req, res, next)=>{
    if(!req.body.password){
        req.flash("error", "vui lòng nhập Mật khẩu mới!");
        res.redirect('back');
        return;
    }

    if(!req.body.repassword){
        req.flash("error", "vui lòng nhận mật khẩu!");
        res.redirect('back');
        return;
    }

    if(req.body.repassword != req.body.password){
        req.flash("error", "Xác nhận mật khẩu không đúng");
        res.redirect("back");
        return;
    }

    next();
}