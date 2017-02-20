var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsMate = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var secret = require('./config/secret');
var User = require('./models/user');

var app = express();

mongoose.connect(secret.database, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to the database');
    }
})

// Logs Requests 
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUnitialized: true,
    secret: secret.secretKey
}));
app.use(flash());

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

// Routes
var mainRoutes = require('./routes/main')
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

app.listen(secret.port, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${secret.port}...`);
})
