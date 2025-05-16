const Product = require("../model/product.model");

module.exports.newPrice = (items) => {
    const newProducts = items.map(item => {
        item.newPrice = (item.price * (1 - item.discountPercentage / 100)).toFixed(0); // Làm tròn sau khi nhân
        return item;
    });
    return newProducts;
};

module.exports.newPriceProduct = (product)=>{
    const newPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(0);
    return newPrice;
}
