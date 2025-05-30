const Cart = require("../../model/cart.model");

module.exports.cart = async (req, res, next)=>{
    if(!req.cookies.cartID){
        //Tạo giỏ hàng
        const cart = new Cart();
        await cart.save();

        //Tạo thời gian sống cho cookie
        const expireCookie = 365 * 24 * 60 * 60;
        res.cookie("cartID", cart.id, {
            expires: new Date(Date.now() + expireCookie)
        });
    }else{
        const cart = await Cart.findOne({
            _id: req.cookies.cartID
        });
        cart.totalQuantity = cart.product.reduce((sum, item)=> sum += item.quantity,0);
        
        res.locals.minicart = cart;
    }
    next();
}