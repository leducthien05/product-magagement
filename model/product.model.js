const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug:{
        type:String,
        slug:"title",
        
    },
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