var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1",
	multipleStatements : true
});
var movieId;

function generateGetResponse(req, res) {
	getMulRequest(req, function(results) {
		console.log('results length', results.length);
		var error = req.session.error;
		var message = req.session.message;
		var error_rec = req.session.error_rec;
		var message_rec = req.session.message_rec;
		var error_watch = req.session.error_watch;
		var message_watch = req.session.message_watch;
		var error_towatch = req.session.error_towatch;
		var message_towatch = req.session.message_towatch;
		var error_friend = req.session.error_friend;
		var message_friend = req.session.message_friend;
		req.session.error = null;
		req.session.message = null;
		req.session.error_rec = null;
		req.session.message_rec = null;
		req.session.error_watch = null;
		req.session.message_watch = null;
		req.session.error_towatch = null;
		req.session.message_towatch = null;
		req.session.error_friend = null;
		req.session.message_friend = null;

		res.render('review.ejs', {
			results : results, 
			user : req.session.user, 
			error: error,
			error_rec: error_rec,
			error_watch: error_watch,
			error_towatch: error_towatch,
			error_friend: error_friend,
			message: message,
			message_rec: message_rec,
			message_watch: message_watch,
			message_towatch: message_towatch,
			message_friend: message_friend
			
		});
	});
}

function getMulRequest(req, callback) {
	 if (req.query.id != null) movieId = req.query.id;
	 var username = req.session.user;
	 var sqlReview = 'select * from Review where movieId = ' + movieId
	 var sqlMovie = 'select * from Movie where movieId = ' + movieId;
	 var sqlRecommend = 'select count(movieId) from Recommends where movieId = ' + movieId;
	 var sqlHaveRecommend = "SELECT COUNT(username) as recCheck FROM cis550sssx1.Recommends WHERE username = '" + username +"' and movieId = "+movieId;
	 var sqlHaveWatch = "SELECT COUNT(username) as watchCheck FROM cis550sssx1.Watched WHERE username = '" + username +"' and movieId = "+movieId;
	 var sqlHaveTowatch = "SELECT COUNT(username) as towatchCheck FROM cis550sssx1.To_Watch WHERE username = '" + username +"' and movieId = "+movieId;
	 var sqlUserCollections = "SELECT name FROM Collection WHERE username = '" + username + "'";
	 // comment this when movieId can be got from request
//	var sqlMovie = 'select * from Movie where movieId = 2';
//	var sqlReview = 'select * from Review';
	 
	 var sqlQuery = sqlMovie + ";" + sqlReview + ";" + sqlRecommend + ";" + sqlHaveWatch + ";" + sqlHaveTowatch +";"+sqlHaveRecommend + ";" + sqlUserCollections;
	 var initTime = new Date().getTime();
	connection.query(sqlQuery, function(err, res) {
		var latency = (new Date().getTime()) - initTime;
		if (err)
			throw err;

		log.info("[review] " + latency + " ms (" + sqlQuery + ")");
		console.log(res);
		callback(res);
	});

}


function addReviewToDB(req, res) {
//	var result = null;
	if(req.session.user == null){
		res.redirect('/login');
		return;
	}
	var sql = "INSERT INTO Review (username, movieId, body, rating) "
//			+ "VALUES ('Harry', 3, 'some review', 5);"; // comment this when values can be passed from request
	+ "VALUES ('" + req.session.user + "'," + req.body.movieId + ",'"
			+ req.body.review_text + "'," + req.body.rating + ");";
	var initTime = new Date().getTime();
	var query = connection.query(sql, function(err, res){
		var latency = (new Date().getTime()) - initTime;
		if (err){
			throw err; // will be error here if no user in USER database because Foreign Key constraint of username
		}
		log.info("[review] " + latency + " ms (" + sql + ")");
		});
	console.log(query.sql);
	res.redirect('/review');	
//	res.render('review.ejs', {results : result,
//		message : 'add review successfully',
//		user: req.session.user
//	});
}

exports.get = function(req, res) {
	generateGetResponse(req, res);
};

exports.post = function(req, res){
	addReviewToDB(req, res);
};