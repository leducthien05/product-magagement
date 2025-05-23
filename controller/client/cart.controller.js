const Cart = require("../../model/cart.model");

module.exports.addProduct = async (req, res)=>{
    const cartID = req.cookies.cartID;
    const Productid = req.params.id;
    const Productquatity = parseInt(req.body.quantity);
    const objectCart = {
        product_ID: Productid,
        quantity: Productquatity
    };
    const productCart = await Cart.findOne({
        _id: cartID,
    });

    const existProductInCart = productCart.product.find(item => item.product_ID == Productid);

    if(existProductInCart){
        const quantitynew = existProductInCart.quantity + Productquatity;
        await Cart.updateOne(
            {
                _id: cartID,
                "product.product_ID": Productid
            },
            {
                $set: {
                    "product.$.quantity": quantitynew
                }
            }
    )
    }else{
        await Cart.updateOne(
            {
                _id: cartID
            },
            {
                $push: { product: objectCart }
            }
        );
    }
    
    req.flash("success", "Thêm vào giỏ hàng thành công");
    res.redirect("back");
}