module.exports.newPrice = (items) => {
    const newProducts = items.map(item => {
        item.newPrice = +(item.price * (1 - item.discountPercentage / 100)).toFixed(0); // Làm tròn sau khi nhân
        return item;
    });
    return newProducts;
};
