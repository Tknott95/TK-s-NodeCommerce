var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsMate = require('ejs-mate');

var User = require('./models/user');

var app = express();

mongoose.connect(`mongodb://root:1@ds017246.mlab.com:17246/nodecommerce`, (err) => {
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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

// Routes

var mainRoutes = require('./routes/main')
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server is Running...');
})
