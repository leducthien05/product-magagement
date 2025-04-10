const dashboardRouter = require("./dashboard.router");
const configSystems = require("../../config/systems");
const productRouter = require("./product.router")
module.exports = (app) => {
    const PATH_ADMIN = configSystems.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", dashboardRouter);
    app.use(PATH_ADMIN + "/product", productRouter);
};