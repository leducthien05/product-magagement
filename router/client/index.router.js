const productMiddleware = require("../../middleware/client/products.middleware");
const productRouter = require("./product.router");
const homeRouter = require("./home.router");
const searchRouter = require("./search.router");
const cartRouter = require("./cart.router");
const cartMiddleware = require("../../middleware/client/cart.middleware");

module.exports = (app) => {
    app.use(productMiddleware.category);
    app.use(cartMiddleware.cart);

    app.use("/", homeRouter);
    app.use("/product", productRouter);
    app.use("/search", searchRouter);
    app.use("/cart", cartRouter);

};