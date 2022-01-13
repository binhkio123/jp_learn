const express = require('express'); // framework free for Node.js
const morgan = require('morgan'); // show what is happening when run code
const path = require('path');
const app = express();
const port = 3000;

const route = require('./routes'); // routes

app.use(express.static(path.join(__dirname, 'public')));
//--------------------------------------------//
const handlebars = require('express-handlebars'); // handlebars support code HTML for website
const hbs = handlebars.create({ extname: '.hbs' });

// TEMPLATE ENGINE
            app.engine('hbs', hbs.engine);
            app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

console.log('PATH: ', path.join(__dirname, 'resources/views')); //xem đường dẫn

//HTTP logger
app.use(morgan('combined'));

//Route create
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
