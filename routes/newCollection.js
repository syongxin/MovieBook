var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1"
});

function newCollection(req, res) {
	console.log(req);
	var collectionName = req.body.collectionName;
	var sqlSelect = "SELECT * FROM Collection WHERE username = '" + req.session.user + "' and name = '" + collectionName + "';";
	console.log(sqlSelect);
	var initTime = new Date().getTime();
	connection.query(sqlSelect, function(err, result) {
		var latency = (new Date().getTime()) - initTime;
		if (err === null) {
			log.info("[newCollection] " + latency + " ms (" + sqlSelect + ")");
			console.log(result);
			if (result.length > 0) {
				res.writeHead(302, {'Location': '/profile', 'message': 'collection already exists!'});
			} else {
				var sqlInsert = "INSERT INTO Collection (name, username)" +
						"VALUES ('" + collectionName + "','" + req.session.user + "');";
				console.log(sqlInsert);
				connection.query(sqlInsert, function(err, insertResult) {
					console.log(insertResult);
					res.writeHead(302, {'Location': '/profile'});
					res.end();
				});
			}
		}
	});
	
}

exports.post = function(req, res) {
	newCollection(req, res);
};