kaze.getJSON = function(url, callback) {
	return kaze.get(url, function(raw) {
		callback(JSON.parse(raw));
	});
};