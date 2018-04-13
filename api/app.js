const express = require("express");
const bodyParser = require('body-parser');
const ejs = require('ejs')


const logger = require('morgan');



// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

app.get('/user', (req, res) => res.render('profile'))


app.use(logger('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/upload.js')(app);
require('./routes/login.js')(app);
require('./routes/profile.js')(app);

// Public folder
app.use(express.static('public'));


const port = 3000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`App is listening on http://localhost:${port}`);
});