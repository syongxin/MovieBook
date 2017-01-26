
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1",
	multipleStatements : true
});
var results = [];

function getMovieInfo(req, callback) {
	var username = req.session.user;
	var sqlWatched =  "select * from Movie M inner join Watched W on M.movieId = W.movieId where username = '" + username + "'"; 
	var sqlToWatch =  "select * from Movie M inner join To_Watch W on M.movieId = W.movieId where username = '" + username + "'"; 
	var sqlUser = "select username,email from User where username = '" + username + "'";
	var sqlCollection = "SELECT C.name, M.* " +
			"FROM Collection C " +
			"LEFT OUTER JOIN Collected_In CI ON (C.username, C.name) = (CI.username, CI.collectionName) " +
			"LEFT OUTER JOIN Movie M ON M.movieId = CI.movieId " +
			"WHERE C.username = '" + username + "'" +
			"ORDER BY C.name";
	var sqlfriend = "select username1 from Friend_with where username2 = '" + username + "'";
	var sqlQuery = sqlWatched + ";" + sqlToWatch + ";" + sqlUser + ";" + sqlCollection + ";" + sqlfriend + ";";
	var initTime = new Date().getTime();
	connection.query(sqlQuery , function(err, res) {
		var latency = (new Date().getTime()) - initTime;
		if (err) throw err;
		log.info("[profile] " + latency + " ms (" + sqlQuery + ")");
	//	console.log(res);
		callback(res);
	});	
}


exports.get = function(req, res){
	getMovieInfo(req, function(result){
		var message = req.session.message;
		req.session.message = null;
		res.render('profile.ejs', {results: result, user: req.session.user, message: message});
	});
};