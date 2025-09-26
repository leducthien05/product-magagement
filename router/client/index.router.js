const productRouter = require("./product.router");
const homeRouter = require("./home.router");
const searchRouter = require("./search.router");
const cartRouter = require("./cart.router");
const orderRouter = require("./order.router");
const userRouter = require("./user.router");

const cartMiddleware = require("../../middleware/client/cart.middleware");
const productMiddleware = require("../../middleware/client/products.middleware");
const loginMiddleware = require("../../middleware/client/login.middleware");

module.exports = (app) => {
    app.use(loginMiddleware.login);
    app.use(productMiddleware.category);
    app.use(cartMiddleware.cart);

    app.use("/", homeRouter);
    app.use("/product", productRouter);
    app.use("/search", searchRouter);
    app.use("/cart", cartRouter);
    app.use("/checkout", orderRouter);
    app.use("/user", userRouter);

};