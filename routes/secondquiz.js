var mysql = require('mysql');
var connection = mysql.createConnection({

	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1"

});

function getResults(req, callback) {
	var answer=[];
	var results=[];
	var scoreCount=0;
	answer[0] = req.body.answer1;
	console.log(answer[0]);
	answer[1] = req.body.answer2;
	answer[2] = req.body.answer3;
	answer[3] = req.body.answer4;
	answer[4] = req.body.answer5;
	answer[5] = req.body.answer6;


	if (answer[0] ==="Yes"){scoreCount++;}
	if (answer[1] ==="Yes"){scoreCount++;}
	if (answer[2] ==="No") {scoreCount++;}
	if (answer[3] ==="Yes"){scoreCount++;}
	if (answer[4] ==="Yes"){scoreCount++;}
	if (answer[5] ==="1913"){scoreCount++;}

	results.push(scoreCount);
	callback(results);

}

function generateResponse(req, res) {
//	console.log('current user : ', req.session.user);
	getResults(req, function(results) {
		
		console.log(results);
//		res.redirect('/review');
		res.render('secondquiz.ejs', {results: results});

	});
}
exports.get = function(req, res){
//	generateResponse(req, res);
	console.log('in get');
	res.render('secondquiz.ejs', {results: null});
};

exports.post = function(req, res){
	generateResponse(req, res);
};