kaze.get = function(url, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
		if(callback)
			callback((request.status < 200 || request.status >= 400) ? request.status : undefined, request.responseText);
	};

	request.onerror = function() {
		if(callback)
			callback('Error requesting ' + url, undefined);
	};

	request.ontimeout = function() {
		if(callback)
			callback('Timeout requesting ' + url, undefined);
	};

	request.send();

	return request;
};