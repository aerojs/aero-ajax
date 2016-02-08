aero.postJSON = function(url, obj) {
	return new Promise(function(resolve, reject) {
		let request = new XMLHttpRequest()

		request.onload = function() {
			if(request.status < 200 || request.status >= 400)
				reject(request.responseText)
			else
				resolve(request.responseText)
		}

		request.onerror = function() {
			reject(new Error('Error requesting ' + url))
		}

		request.ontimeout = function() {
			reject(new Error('Timeout requesting ' + url))
		}

		request.open('POST', url, true)
		request.setRequestHeader('Content-type', 'application/json')
		request.send(JSON.stringify(obj))
	})
}