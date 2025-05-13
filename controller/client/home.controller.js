module.exports.index = async (req, res) => {
    res.render('client/page/home/index', {
        titlePage: "Trang chủ"
    })
}