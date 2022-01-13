class NewsController {
    // [GET] /game
    index(req, res) {
        res.render('memory-game');
    }
}

module.exports = new NewsController();
