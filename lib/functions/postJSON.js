kaze.postJSON = function(url, obj, callback) {
	var request = new XMLHttpRequest();
	request.open('POST', url, true);
	request.setRequestHeader('Content-type', 'application/json');

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

	request.send(JSON.stringify(obj));

	return request;
};