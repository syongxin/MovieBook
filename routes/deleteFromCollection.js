var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1"
});

function deleteFromCollection(req, res) {
	var username = req.session.user;
	var collectionName = req.query.collectionName;
	var movieId = req.query.movieId;
	console.log(req.query);
	var sqlDelete = "DELETE FROM Collected_In WHERE (movieId, username, collectionName) = " +
			"(" + movieId + ", '" + username + "', '" + collectionName + "')";
	console.log(sqlDelete);

	var initTime = new Date().getTime();
	connection.query(sqlDelete, function(err, rows) {
		var latency = (new Date().getTime()) - initTime;
		if (err) {
			console.log(err);
		} else {
			log.info("[deleteFromCollection] " + latency + " ms (" + sqlDelete + ")");
			req.session.message = req.query.title + " successfully removed from " + collectionName + "!";
		}
		res.redirect('/profile');
	});
}

exports.get = function (req, res) {
	deleteFromCollection(req, res);
};