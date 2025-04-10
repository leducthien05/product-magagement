module.exports.createItem = (req, res, next)=>{
    if(!req.body.title){
        req.flash("error", "vui lòng nhập tiêu đề của sản phẩm!");
        res.redirect('back');
        return;
    }
    next();
}