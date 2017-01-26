var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1"
});

function deletefriend(req, res) {
	var username1 = req.query.delfriend;
	console.log(req.query);
	console.log(username1);

	var sqlDelete = "DELETE FROM Friend_with WHERE (username1, username2) = " +
			"('" + username1 + "', '" + req.session.user + "')";
	console.log(sqlDelete);

	var initTime = new Date().getTime();
	connection.query(sqlDelete, function(err, rows) {
		var latency = (new Date().getTime()) - initTime;
		if (err) {
			console.log(err);
		}
		log.info("[deletefriend] " + latency + " ms (" + sqlDelete + ")");
		res.redirect('/profile');
	});
}

exports.get = function (req, res) {
	deletefriend(req, res);
};