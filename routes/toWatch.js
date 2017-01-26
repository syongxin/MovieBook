
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1"
});


function addToWatchMovie(req, res) {
	var username = req.session.user;
	var movieId = req.query.movieId;
	var sql =  "INSERT INTO To_Watch (username, movieId) " + 
	"VALUES ('" + username + "', " + movieId + ");";
	
	var initTime = new Date().getTime();
	var query = connection.query(sql, function(err, rows) {
		var latency = (new Date().getTime()) - initTime;
		if (err) {
			console.log(err);
			req.session.error_towatch = "You already added this movie to To Watch list !";
		} else {
			log.info("[toWatch] " + latency + " ms (" + sql + ")");
			req.session.message_towatch = "Add to list sucessfully!";
		}
		res.redirect('/review');
			
	});	
}

exports.get = function(req, res){
	addToWatchMovie(req, res);
};