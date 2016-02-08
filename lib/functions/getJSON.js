aero.getJSON = function(url) {
	return aero.get(url).then(JSON.parse)
}