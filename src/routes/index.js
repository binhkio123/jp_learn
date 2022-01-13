const siteRoute = require('./site');
const memoryGameRoute = require('./memory-game');

function route(app) {
    app.use('/memory-game', memoryGameRoute);

    app.use('/', siteRoute);
}

module.exports = route;
