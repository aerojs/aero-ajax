$.get = url => {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest()

		request.onerror = () => reject(new Error('You are either offline or the requested page doesn\'t exist.'))
		request.ontimeout = () => reject(new Error('The page took too much time to respond.'))
		request.onload = () => {
			if(request.status < 200 || request.status >= 400)
				reject(request.responseText)
			else
				resolve(request.responseText)
		}

		request.open('GET', url, true)
		request.send()

		$.lastRequest = request
	})
}