exports.get = function(req, res){
	req.session.user = null;
	res.redirect('/login');	
};