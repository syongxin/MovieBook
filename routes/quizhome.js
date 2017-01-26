var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1"
});


function renderquiz(req, res) {
	var username = req.session.user;
		res.render('quizhome.ejs');
			
}

exports.get = function(req, res){
	renderquiz(req, res);
};