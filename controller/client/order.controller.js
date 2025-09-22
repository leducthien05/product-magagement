const Cart = require("../../model/cart.model");
const Product = require("../../model/product.model");
const newPrice = require("../../helper/newPriceProduct");
const Order = require("../../model/order.model");

module.exports.index = async (req, res)=>{
    const idCart = req.cookies.cartID;
    const CartProduct = await Cart.findOne({
        _id: idCart
    });

    if (CartProduct.product.length > 0) {
        for (const item of CartProduct.product) {
            const ID_product = item.product_ID;

            const productInfo = await Product.findOne({
                _id: ID_product,
            }).select("title price discountPercentage thumbnail");

            // Tính giá mới
            productInfo.priceNew = newPrice.newPriceProduct(productInfo);

            // Tổng tiền theo số lượng
            item.totalPrice = productInfo.priceNew * item.quantity;

            // Gắn thông tin sản phẩm vào giỏ
            item.productInfo = productInfo;
        }

        // Tính tổng tiền giỏ hàng
        CartProduct.SumPrice = CartProduct.product.reduce((sum, item) => {
            return sum + item.totalPrice;
        }, 0);
    }

    res.render("client/page/checkout/index", {
        titlePage: "Trang thanh toán", 
        productList: CartProduct
    })
}

module.exports.order = async (req, res)=>{
    const ID_Cart = req.cookies.cartID;
    const userinfo = req.body;

    const cart = await Cart.findOne({
        _id: ID_Cart
    });

    const productInfo = [];
    for (const item of cart.product) {
        // Lấy thông tin sản phẩm
        const objectProduct = {
            product_ID: item.product_ID,
            price: 0,
            discountPercentage: 0,
            quantity: item.quantity
        };

        const product = await Product.findOne({
            _id: item.product_ID
        }).select("price discountPercentage");

        objectProduct.price = product.price;
        objectProduct.discountPercentage = product.discountPercentage;

        productInfo.push(objectProduct);
    }

    console.log(productInfo);

    const orderInfo = {
        ID_Cart: ID_Cart,
        userInfo:userinfo,
        products:productInfo,
        status: "initial"
    };

    const order = new Order(orderInfo);
    order.save();

    await Cart.updateOne({
        _id: ID_Cart
    }, {
        product: []
    });

    res.redirect(`/checkout/success/${order._id}`);
}

module.exports.success = async (req, res)=>{
    const ID_Order = req.params.idOrder
    console.log(ID_Order);
    res.render("client/page/checkout/success", {
        titlePage: "Đặt hàng thành công"
    });
}
