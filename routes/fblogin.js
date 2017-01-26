
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'cis550sssx1.ctkpynhhrynh.us-west-2.rds.amazonaws.com',
	user : 'cis550sssx1',
	password : 'cis550sssx1',
	port : '3306',
	database : "cis550sssx1"
});

function fblogin(req, res){
	console.log('in fblogin post');
	console.log(req);


}

exports.post = function(req, res){
	login(req, res);
};
//
//exports.get = function(req, res){
////	login(req, res);
//};