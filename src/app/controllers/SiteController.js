class NewsController {
    // [GET] /
    index(req, res) {
        res.render('home');
    }
}

module.exports = new NewsController();
