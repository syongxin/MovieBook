var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1"
});

function addfriend(req, res) {
//	var result = null;
	if(req.session.user == null){
		res.redirect('/login');
		return;
	}
	var username1 = req.body.reviewUser;
	var sqladdfriend = "INSERT INTO Friend_with (username1, username2) " + "VALUES ('" + username1 + "', '" + req.session.user + "')";
	console.log(sqladdfriend);
	var initTime = new Date().getTime();
	connection.query(sqladdfriend, function(err, rows){
		var latency = (new Date().getTime()) - initTime;
		if (err){
			console.log(err);
			error = err;
			req.session.error_friend = "This user already in your friend list !";
		}
		else {
			log.info("[addfriend] " + latency + " ms (" + sqladdfriend + ")");
			req.session.message_friend = "Friend added !";
		}
		res.redirect('/review');
		});	
}

exports.post = function(req, res){
	addfriend(req, res);
};
