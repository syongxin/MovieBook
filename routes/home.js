
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1",
	multipleStatements : true
});

function getResults(callback) {
	var results = [];
	var sqlSelectMovie = 'SELECT * FROM Movie where movieId < 300';
	var sqlSelectHighestVotes = 'select * from Movie order by votes DESC limit 10';
	var sqlSelectLowestVotes = 'select * from Movie order by votes limit 10';
	var sqlSelectLongestRunTime = 'select * from Movie order by runtime DESC limit 10';
	var sqlQuery = sqlSelectMovie + ";" + sqlSelectHighestVotes + ";" + sqlSelectLowestVotes + ";" + sqlSelectLongestRunTime;
	var initTime = new Date().getTime();
	connection.query(sqlQuery, function(err, res, fields) {
		  var latency = (new Date().getTime()) - initTime;
		  if (err) {
			  console.log('Connection to mysql failed.');
			  throw err; 
		  }else{
			  log.info("[home] " + latency + " ms (" + sqlQuery + ")");
			  console.log('Connected to mysql.');
			  var rand = Math.floor((Math.random() * 200) + 1);
			  var result = [];
			  for(var i = 0; i < 12; i++){
				  var data = {};
				  data['title'] = res[0][i + rand].title;
				  data['poster'] = res[0][i + rand].poster;
				  data['movieId'] = res[0][i + rand].movieId;
				  result.push(data);
			  }
			  results.push(result);
			  for(var i = 1; i <= 3; i++){
				  result = [];
				  for(var j = 0; j < 10; j++){
					  var data = {};
					  data['title'] = res[i][j].title;
					  data['votes'] = res[i][j].votes;
					  data['runtime'] = res[i][j].runtime;
					  data['movieId'] = res[i][j].movieId;
					  result.push(data);
				  }
				  results.push(result);
			  }
//			  console.log(results);
			  callback(results);
		  }
		});
}

function generateResponse(req, res) {
		console.log('current user : ', req.session.user);
			getResults(function(results) {
				res.render('home.ejs', {results: results, user: req.session.user});
				
			});
}

exports.get = function(req, res){
	generateResponse(req, res);
};