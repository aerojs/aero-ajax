aero.postJSON = (url, obj) => {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest()

		request.onerror = () => reject(new Error('Error requesting ' + url))
		request.ontimeout = () => reject(new Error('Timeout requesting ' + url))
		request.onload = () => {
			if(request.status < 200 || request.status >= 400)
				reject(request.responseText)
			else
				resolve(request.responseText)
		}

		request.open('POST', url, true)
		request.setRequestHeader('Content-type', 'application/json')
		request.send(JSON.stringify(obj))
	})
}