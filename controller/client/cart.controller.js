const Cart = require("../../model/cart.model");
const Product = require("../../model/product.model");
const newPrice = require("../../helper/newPriceProduct");

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
    //Lấy id giỏ hàng
    const ID_cart = req.cookies.cartID;

    //Tìm giỏ hàng
    const productCart = await Cart.findOne({
        _id: ID_cart
    });

    //Lấy thông tin giỏ hàng
    if(productCart.product.length > 0){//productCart là một object, product là mảng sản phẩm
        for(const item of productCart.product){
            const productID = item.product_ID;
            const productInfo = await Product.findOne({
                _id: productID,
            }).select("title slug thumbnail price discountPercentage");
            productInfo.priceNew = newPrice.newPriceProduct(productInfo);
            item.totalPrice = productInfo.priceNew * item.quantity;
            item.productInfo = productInfo;
        }
        
    }

    //Lấy tổng tiền
    productCart.SumPrice = productCart.product.reduce((sum, item)=>{return sum + item.totalPrice}, 0);
    console.log(productCart);

    res.render("client/page/cart/index", {
        titlePage: "Trang giỏ hàng",
        product: productCart
    })
}

module.exports.delete = async (req, res)=>{
    
    try {
        const id = req.params.idProduct;
        const idCart = req.cookies.cartID;
        console.log(idCart);
        await Cart.updateOne({
            _id: idCart
        },{
            $pull: {product: {product_ID: id}}
        });
        req.flash("sucsess", "Đã xóa sản phẩm thành công");
        res.redirect("back");
    } catch (error) {
        req.flash("error", "Xóa sản phẩm không thành công");
        res.redirect("back");
    }
    
}