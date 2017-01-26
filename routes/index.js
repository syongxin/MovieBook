var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//	res.render('homepage');
//});

router.get('/references', function(req, res, next) {
	res.render('references');
});

router.get('/sample', function(req, res, next) {
	res.render('sample', {results: null});
});

router.get('/homework', function(req, res, next) {
	res.render('homework', {results: null});
});

module.exports = router;
