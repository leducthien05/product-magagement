const productMiddleware = require("../../middleware/client/products.middleware");
const productRouter = require("./product.router");
const homeRouter = require("./home.router");
const searchRouter = require("./search.router");

module.exports = (app) => {
    app.use(productMiddleware.category)
    app.use("/", homeRouter);
    app.use("/product", productRouter);
    app.use("/search", searchRouter);
};