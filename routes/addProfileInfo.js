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
//	console.log(req);
	connectDB(function(db){
		var collection = db.collection("profile");
		var query = {};
		query['name'] = "testNoSQLUser";
		query['description'] = req.body.self_description;
		console.log(req);
		console.log(req.body.self_description);
//		query['firstname'] = req.body.firstname;
//		query['lastname'] = req.body.lastname;
		
//		query['name'] = username;
//		query['picture'] = picture;
		
		var initTime = new Date().getTime();
		collection.insert(query, function(err, result) {
			var latency = (new Date().getTime()) - initTime;
			log.info("[addProfileInfo] " + latency + " ms (" + query + ")");
//			callback(result);
			console.log(result);
		});
	});
}

function find(req) {
	connectDB(function(db){
		var collection = db.collection("profile");
		var query = {};
		query['name'] = req.session.user;
		
//		query['name'] = username;
		collection.find(query).toArray(function(err, results) {
			console.log(results);
//			callback(results);
		});
	});
}

function remove(req) {
	connectDB(function(db){
		var collection = db.collection("profile");
		var query = {};
		query['name'] = req.session.user;
		
//		query['name'] = username;
		collection.remove(query, function(err, result) {
			console.log(results);
//			callback(result);
		});
	});
}

exports.get = function(req, res){
	insert(req);
//	find('abc');
	res.redirect('/home');	
};