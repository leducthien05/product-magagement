module.exports = (app) => {
    const productRouter = require("./product.router");
    const homeRouter = require("./home.router");
    app.use("/", homeRouter);
    app.use("/product", productRouter);
};