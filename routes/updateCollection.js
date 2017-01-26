var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1"
});

function addToCollection(req, res) {
	console.log(req);
	var username = req.session.user;
	var collectionName = req.query.collectionName;
	var movieId = req.query.movieId;
	var sqlInsert = "INSERT INTO Collected_In (movieId, username, collectionName) " +
			"VALUES (" + movieId + ", '" + username + "', '" + collectionName + "')";
	console.log(sqlInsert);

	var error = null;
	
	var initTime = new Date().getTime();
	connection.query(sqlInsert, function(err, rows) {
		var latency = (new Date().getTime()) - initTime;
		if (err) {
			console.log(err);
			error = err;
			req.session.error = "Movie already exists in " + collectionName + "!";
		} else {
			log.info("[updateCollection] " + latency + " ms (" + sqlInsert + ")");
			req.session.message = "Movie successfully added to " + collectionName + "!";
		}
		res.redirect('/review');
	});
}

exports.get = function (req, res) {
	addToCollection(req, res);
};