
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1"
});

function getSearchResults(req, callback) {
//	console.log(req);
	var results = [];
	var keyword = req.query.keyword;
	var sqlMovie = 'select * from Movie where title like \'%' + keyword + '%\'';
//	console.log(keyword + "=keyword");
//	console.log(sqlMovie);
//	var sqlMovie = 'select * from Movie where title like \'%Abso%\''; // comment this when keyword can be got from request
	var initTime = new Date().getTime();
	connection.query(sqlMovie, function(err, rows, fields) {
		var latency = (new Date().getTime()) - initTime;
		  if (err) {
			  console.log('Connection to mysql failed.');
			  throw err; 
		  }else{
			  log.info("[searchMovie] " + latency + " ms (" + sqlMovie + ")");
			  console.log('Connected to mysql.');
//			  for(var i = 0; i < rows.length; i++){
//				  var data = {};
//				  data['movieId'] = rows[i].movieId;
//				  data['title'] = rows[i].title;
//				  data['overview'] = rows[i].overview;
//				  data['poster'] = rows[i].poster;
//				  data['genre'] = rows[i].genre;
//				  data['homepage'] = rows[i].homepage;
//				  data['runtime'] = rows[i].runtime;
//				  results.push(data);
//			  }
			  callback(rows);
		  }
		});
}

function generateResponse(req, res) {
			getSearchResults(req, function(results) {
				res.render('searchMovie.ejs', {results: results, user: req.session.user});
				
			});
}

exports.get = function(req, res){
	generateResponse(req, res);
};