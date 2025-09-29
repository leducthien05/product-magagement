const User = require("../../model/users.model");

module.exports.login = async (req, res, next) => {
    if (req.cookies.tokenUser) {
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            
        }).select("-password");
        if (user) {
            res.locals.user = user; // ✅ gán đúng
        }
    }
    next();
}
