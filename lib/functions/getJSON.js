kaze.getJSON = function(url, callback) {
	return kaze.get(url, function(error, raw) {
		if(error)
			callback(error, undefined);
		else
			callback(undefined, JSON.parse(raw))
	});
};