const mongoose = require("mongoose");
const generate = require("../helper/generate");

const accountSchema = new mongoose.Schema({
    fulname: String,
    email: String,
    phone: String,
    token:{
      type: String,
      default: generate.generateRandomString(20)
    },
    pasword: String,
    avater: String,
    roles_ID: String,
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

productSchema.post("save", async function (doc, next) {
    if (!doc.slug.includes(doc._id.toString())) {
      doc.slug = `${doc.slug}-${doc._id}`;
      await doc.constructor.updateOne({ _id: doc._id }, { slug: doc.slug });
    }
    next();
  });
  
  

const Product = mongoose.model('Product', productSchema, "products");
//kết nối ra bên ngoài
module.exports = Product;