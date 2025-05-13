const dashboardRouter = require("./dashboard.router");
const configSystems = require("../../config/systems");
const productRouter = require("./product.router");
const productCategoryRouter = require("./product-category.router");
const roleRouter = require("./roles.router");
const accountRouter = require("./account.router");
const authRouter = require("./auth.router");
const authMiddleware = require("../../middleware/admin/auth.middleware");
const informationAccount = require("./information.router");

module.exports = (app) => {
    const PATH_ADMIN = configSystems.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard",authMiddleware.requireAuth, dashboardRouter);
    app.use(PATH_ADMIN + "/product",authMiddleware.requireAuth, productRouter);
    app.use(PATH_ADMIN + "/product-category",authMiddleware.requireAuth, productCategoryRouter);
    app.use(PATH_ADMIN + "/roles",authMiddleware.requireAuth, roleRouter);
    app.use(PATH_ADMIN + "/accounts",authMiddleware.requireAuth, accountRouter);
    app.use(PATH_ADMIN + "/myaccount",authMiddleware.requireAuth, informationAccount);
    app.use(PATH_ADMIN + "/auth", authRouter);

};