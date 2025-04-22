const dashboardRouter = require("./dashboard.router");
const configSystems = require("../../config/systems");
const productRouter = require("./product.router");
const productCategoryRouter = require("./product-category.router");
const roleRouter = require("./roles.router");
module.exports = (app) => {
    const PATH_ADMIN = configSystems.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", dashboardRouter);
    app.use(PATH_ADMIN + "/product", productRouter);
    app.use(PATH_ADMIN + "/product-category", productCategoryRouter);
    app.use(PATH_ADMIN + "/roles", roleRouter);
};