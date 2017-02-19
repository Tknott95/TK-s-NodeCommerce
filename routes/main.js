var router = require('express').Router();

// Can use either router or app
router.get('/', function(req, res) {
    res.render('./main/home');
});

router.get('/about', function(req, res) {
    res.render('main/about');
});

module.exports = router;
