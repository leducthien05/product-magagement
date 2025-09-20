const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


//Tạo giỏ hàng: id người dùng (đã đăng nhập) và mảng các sản phẩm
const cartSchema = new mongoose.Schema(
    {
        userID: String,
        product: [
            {
                product_ID: String,
                quantity: Number
            }
        ]
    },
    {
        timestamps: true
    }
);

const Carts = mongoose.model('carts', cartSchema, "carts");
//kết nối ra bên ngoài
module.exports = Carts;