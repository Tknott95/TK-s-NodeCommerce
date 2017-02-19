var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsMate = require('ejs-mate');

var User = require('./models/user');

var app = express();

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://root:1@ds017246.mlab.com:17246/nodecommerce`, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to the database');
    }
})

// Logs Requests 
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.post('/create-user', (req, res) => {
    var user = new User();

    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save((err) => {
        if (err) return next(err);

        res.json('Successfully created a new user');
    });
})

app.get('/', (req, res) => {
    res.render('main/home');
})

app.get('/about', (req, res) => {
    res.render('main/about');
})

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server is Running...');
})
