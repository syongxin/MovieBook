
var mysql = require('mysql');
var crypto = require('crypto'); // for hashing passwords

var connection = mysql.createConnection({
	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1"
});

var mongodb = require('mongodb').MongoClient;

function connectDB(callback) {
	console.log('in connect to mongoDB');
	mongodb.connect("mongodb://siyuxie:siyuxie@ds027825.mongolab.com:27825/cis550project", function(err, db) {
		if(!err) {
			callback(db);
		} else {
			console.log("mongodb connection error");
			console.log(err);
		}
	});
}

function insert(req) {
	connectDB(function(db){
		var collection = db.collection("profile");
		var query = {};
		query['name'] = req.body.username;
		query['description'] = req.body.self_description;
		console.log(req);
		console.log(req.body.self_description);
		collection.insert(query, function(err, result) {
			console.log(result);
		});
	});
}

function get(req, res){
	res.render('register.ejs', {
		message : null
	});
}

function createUser(req, res){
//	console.log(req);
	var username = req.body.username;
	var firstname= req.body.firstname;
	var lastname= req.body.lastname;
	var passwordHash = crypto.createHash("sha1").update(req.body.password).digest('hex');
	var email = req.body.email;
	var selectSql = "SELECT * FROM User WHERE username='" + username + "';";
//		var selectSql = "SELECT * FROM User WHERE username='Ron'";
//	console.log(selectSql);
	var initTime = new Date().getTime();
	connection.query(selectSql, function(err, result){
		var latency = (new Date().getTime()) - initTime;
			if(err == null){
				log.info("[register] " + latency + " ms (" + selectSql + ")");
				console.log(result);
				if(result.length > 0){
					console.log(req.session.username, ' : user already exists!');
					res.render('register.ejs', {
						message : 'user already exists!'
					});
				}else{
					var insertSql = 'INSERT INTO User (username, password, email, firstname, lastname) ' + 
					"VALUES ('" + username + "', '" + passwordHash + "', '"+ email + "', '"+ firstname +"', '"+ lastname +"');";
//					console.log(insertSql);
					connection.query(insertSql, function(err, insertResult){
						console.log(insertResult);
						if(err == null){
							req.session.user = username;
							console.log(req.session.username, ' : user created!');
//							res.render('register.ejs', {
//								message : 'user successfully created!'
//							});
							res.writeHead(302, {
								  'Location': '/home'
								});
							res.end();
						}
					});
				}
			}
		});

}

exports.post = function(req, res){
	insert(req);
	createUser(req, res);
};

exports.get = function(req, res){
	get(req, res);
};