function bingSearch(req, res) {
	 var keyword = req.query.keyword;
//	var keyword = 'sushi'; // comment this
	var key = "iq7qyLPOOeQmD5Ob76vvgo0hQjlNfciJ1Wfw+IUxYmA"; // add auth key here
	var authorization = new Buffer([ key, key ].join(":")).toString('base64');
	var bingUrl = 'https://api.datamarket.azure.com/Bing/Search/Web'
	var bingReq = require('request').defaults({
		headers : {
			'Authorization' : 'Basic' + ' ' + authorization
		}
	});
	bingReq.get({
		url : bingUrl,
		qs : {
			$format : 'json',
			Query : "'" + keyword + "'",
		}
	}, function(err, bingRes) {
		if (err) {
			console.log(err)
		}else{
			console.log(bingRes.body);
			var results = [];
			var obj = JSON.parse(bingRes.body);
			var resultBody = obj.d.results;
			for(var i = 0; i < resultBody.length; i++){
				var data = {};
				  data['title'] = resultBody[i]['Title'];
				  data['description'] = resultBody[i]['Description'];
				  data['url'] = resultBody[i]['Url'];
				  results.push(data);
			}
			res.render('bingSearch.ejs', {results : results, user: req.session.user});
		}

	});
}

exports.get = function(req, res) {
	bingSearch(req, res);
};