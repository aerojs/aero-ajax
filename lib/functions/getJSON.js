kaze.getJSON = function(url) {
	return kaze.get(url).then(JSON.parse);
};