module.exports.register = (req, res, next)=>{
    if(!req.body.fullname){
        req.flash("error", "vui lòng nhập tên sản phẩm!");
        res.redirect('back');
        return;
    }

    if(!req.body.email){
        req.flash("error", "vui lòng nhập email!");
        res.redirect('back');
        return;
    }

    if(!req.body.password){
        req.flash("error", "vui lòng nhập mật khẩu!");
        res.redirect('back');
        return;
    }
    next();
}