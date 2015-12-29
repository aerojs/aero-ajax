kaze.postJSON = function(url, obj, callback) {
	var request = new XMLHttpRequest();
	request.open('POST', url, true);
	request.setRequestHeader('Content-type', 'application/json');

	request.onload = function() {
		if(request.status < 200 || request.status >= 400)
			console.error('Error requesting ' + url + ': ' + request.status);

		if(callback)
			callback(request.responseText);
	};

	request.onerror = function() {
		console.error('Error requesting ' + url);
	};

	request.ontimeout = function() {
		console.error('Timeout requesting ' + url);
	};

	request.send(JSON.stringify(obj));

	return request;
};