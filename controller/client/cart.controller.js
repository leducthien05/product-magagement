const Cart = require("../../model/cart.model");

module.exports.addProduct = async (req, res)=>{
    const cartID = req.cookies.cartID;//Lấy giỏ hàng trong database
    const Productid = req.params.id;//Lấy ID sản phẩm 
    const Productquatity = parseInt(req.body.quantity);//Lấy số lượng sản phẩm trong giỏ hàng
    const objectCart = {//những sản phẩm trong giỏ hàng
        product_ID: Productid,
        quantity: Productquatity
    };
    const productCart = await Cart.findOne({
        _id: cartID,
    });//Tìm kiếm sản phẩm trong database

    const exitsProductInCart = productCart.product.find(item => item.product_ID == Productid);
    console.log(exitsProductInCart);

    if(exitsProductInCart){
        const quantitynew = exitsProductInCart.quantity + Productquatity;
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
// Lấy giỏ hàng từ cookie.

// Lấy ID sản phẩm và số lượng từ request.

// Kiểm tra sản phẩm đã có trong giỏ hay chưa.

// Nếu có, cộng thêm số lượng; nếu chưa, thêm sản phẩm mới vào giỏ.

// Gửi thông báo thành công và quay lại trang trước.

module.exports.index = async (req, res)=>{
    res.render("client/page/cart/index", {
        titlePage: "Trang giỏ hàng"
    })
}