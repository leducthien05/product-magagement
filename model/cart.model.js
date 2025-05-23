const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

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