const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    product_category_id: {
        type: String,
        default: ""
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    featured: String,
    slug:{
        type:String,
        slug:"title",
        
    },
    createdBy: {
        account_ID: String,
        createAt: {
            type: Date,
            default: Date.now
        }
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        account_ID: String,
        deletedAt: Date
    },
    updatedBy: [
        {
            account_ID: String,
            updatedAt:Date
        }
    ],
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