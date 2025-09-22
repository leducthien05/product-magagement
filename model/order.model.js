const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    //ID_User: String,
    ID_Cart: String,
    userInfo: {
        fullName: String,
        phone: String,
        address: String
    },
    products:[
        {
            product_ID: String,
            price: Number,
            discountPercentage: Number,
            quantity: Number
        }
    ],
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},
{
    timestamps: true
});
   

const Order = mongoose.model('Order', orderSchema, "order");
//kết nối ra bên ngoài
module.exports = Order;