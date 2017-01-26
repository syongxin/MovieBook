
var mysql = require('mysql');
var crypto = require('crypto'); // for hashing passwords

var connection = mysql.createConnection({
	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1"
});
function get(){
	return;
}
function login(req, res){
	 var username = req.body.username;
//	var username = 'Ron'; // comment this when username can be get from request
	var password = req.body.password;
//	var email = req.query.email;
	var selectSql = "SELECT * FROM User WHERE username='" + username + "';";
//		var selectSql = "SELECT * FROM User WHERE username='Ron'";
	var initTime = new Date().getTime();
	connection.query(selectSql, function(err, result){
			var latency = (new Date().getTime()) - initTime;
			if(err == null){
				log.info("[login] " + latency + " ms (" + selectSql + ")");
				console.log(result);
				if(result.length == 0 || result[0].password != crypto.createHash("sha1").update(req.body.password).digest('hex')) {
					console.log('user not exists!');

					//res.writeHead(302, {
					//	  'Location': '/login'
					//	});
					res.render('login.ejs', {
						message : 'invalid credentials'
					});
				} else {
					req.session.user = username;
					console.log(req.session.user + ' : user login success!');
					res.writeHead(302, {
						  'Location': '/home'
						});
//					res.render('login.ejs', {
//						message : 'login success!',
//						name : username
//					});
				}
				res.end();
			}
		});
}

exports.post = function(req, res){
	login(req, res);
};

exports.get = function(req, res){
	res.render('login.ejs', {
		message : null
	});
};