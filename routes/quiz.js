var mysql = require('mysql');
var buf1=[];
var connection = mysql.createConnection({
	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1",
	multipleStatements : true
});
function onSubmit(req,callback){
	var results=[];
	var answer=[];
	var scoreCount = 0;
	answer[0] = req.body.FirstQuestion;
	answer[1] = req.body.SecondQuestion;
	answer[2] = req.body.ThirdQuestion;
	answer[3] = req.body.FourthQuestion;
	answer[4] = req.body.FifthQuestion;
	answer[5] = req.body.SixthQuestion;
	for(var i = 0; i < 6; i++){
		if(answer[i] === ("" + (i + 1))) scoreCount++;
	}
	callback(scoreCount);
	
}
	
	
function getResults(callback) {
	var results = [];
	//var buf1=new Buffer(20);
	var sqlSelectMovie = 'SELECT * FROM Movie where movieId <500';
	var initTime = new Date().getTime();
	connection.query(sqlSelectMovie, function(err, res, fields) {
		var latency = (new Date().getTime()) - initTime;
		  if (err) {
			  console.log('Connection to mysql failed.');
			  throw err; 
		  }else{
			  log.info("[quiz] " + latency + " ms (" + sqlSelectMovie + ")");
			  console.log('Connected to mysql.');
			  var rand = Math.floor((Math.random() * 200) + 1);
			  for(var i = 0; i < 12; i++){
				  var data = {};
				  data['title'] = res[i + rand].title;
				  data['overview'] =res[i + rand].overview;
				  buf1[i]=res[i + rand].title;
				  results.push(data);
				  
			  }
		  }
		//console.log(results); 
		  callback(results);
		  });
}

function generateResponse(req, res) {
		//console.log('current user : ', req.session.user);
			getResults(function(results) {
				res.render('quiz.ejs', {user: req.session.user, results: results, score: null});
				
			});
}

function generateScore(req,res) {
	
	//console.log('current user:', req.session.user);
	  onSubmit(req, function(scoreCount){
		  res.render('quiz.ejs',{score: scoreCount,user: req.session.user});
//
	  });
}

exports.post = function(req,res){
	generateScore(req,res);
};
exports.get = function(req, res){
	generateResponse(req, res);
};