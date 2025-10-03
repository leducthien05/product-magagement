const Account = require("../../model/account.model");
const User = require("../../model/users.model");
const Category = require("../../model/product-category.model");
const Product = require("../../model/product.model");

// GET /admin/dashboard
module.exports.dashboard = async (req, res)=>{
    const object = {
        category: {
            count: 0,
            active: 0,
            inactive: 0
        },
        product: {
            count: 0,
            active: 0,
            inactive: 0
        },
        admin: {
            count: 0,
            active: 0,
            inactive: 0
        },
        client: {
            count: 0,
            active: 0,
            inactive: 0
        },
    }

    //Category
    object.category.count = await Category.countDocuments({
        deleted: false
    });

    object.category.active = await Category.countDocuments({
        deleted: false,
        status: "active"
    });

    object.category.inactive = await Category.countDocuments({
        deleted: false,
        status: "inactive"
    });

    //Product
    object.product.count = await Product.countDocuments({
        deleted: false
    });

    object.product.active = await Product.countDocuments({
        deleted: false,
        status: "active"
    });

    object.product.inactive = await Product.countDocuments({
        deleted: false,
        status: "inactive"
    });

    //Admin
    object.admin.count = await Account.countDocuments({
        deleted: false
    });

    object.admin.active = await Account.countDocuments({
        deleted: false,
        status: "active"
    });

    object.admin.inactive = await Account.countDocuments({
        deleted: false,
        status: "inactive"
    });

    //Client
    object.client.count = await User.countDocuments({
        deleted: false
    });

    object.client.active = await User.countDocuments({
        deleted: false,
        status: "active"
    });

    object.client.inactive = await User.countDocuments({
        deleted: false,
        status: "inactive"
    });

    res.render('admin/page/dashboard/index', {
        titlePage: "Trang tổng quan",
        object: object
    });
    
} 