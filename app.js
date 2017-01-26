var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var routes = require('./routes/index');
var home = require('./routes/home');
var search = require('./routes/searchMovie');
var review = require('./routes/review');
var register = require('./routes/register');
var recommend = require('./routes/recommend');
var bing = require('./routes/bingSearch');
var login = require('./routes/login');
var logout = require('./routes/logout');
var fblogin = require('./routes/fblogin');
var watched = require('./routes/watched');
var toWatch = require('./routes/toWatch');
var profile = require('./routes/profile');
var newCollection = require('./routes/newCollection');
var updateCollection = require('./routes/updateCollection');
var deleteFromCollection = require('./routes/deleteFromCollection');
var quiz = require('./routes/quiz');
var secondquiz = require('./routes/secondquiz');
var quizhome = require('./routes/quizhome');
var addfriend = require('./routes/addfriend');
var deletefriend = require('./routes/deletefriend');
//var addPicToNoSQL = require('./routes/addProfileInfo');
var app = express();

console.log('CIS450/550 Project');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use(session({
	  cookieName: 'session',
	  secret: 'CIS550Project',
	  duration: 300000,
	  activeDuration: 100000,
	}));

app.get('/', home.get);
app.get('/home', home.get);
app.get('/searchMovie', search.get);
app.get('/review', review.get);
app.get('/recommend', recommend.get);
app.get('/bingSearch', bing.get);
app.get('/login', login.get);
app.get('/register', register.get);
app.get('/logout', logout.get);
app.get('/towatchMovie', toWatch.get);
app.get('/watchedMovie', watched.get);
app.get('/profile', profile.get);
app.get('/updateCollection', updateCollection.get);
app.get('/deleteFromCollection', deleteFromCollection.get);
app.get('/quiz', quiz.get);
app.get('/secondquiz',secondquiz.get);
app.get('/quizhome',quizhome.get);
app.get('/deletefriend',deletefriend.get);
//app.get('/addPicToNoSQL', addPicToNoSQL.get);

app.post('/fblogin', fblogin.post);
app.post('/login', login.post); // to test it with browser, you can change it into get; or use telnet localhost as post method
app.post('/register', register.post); // to test it with browser, you can change it into get; or use telnet localhost as post method
app.post('/review', review.post);
app.post('/newCollection', newCollection.post);
app.post('/quiz', quiz.post);
app.post('/secondquiz',secondquiz.post);
app.post('/addfriend',addfriend.post);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;