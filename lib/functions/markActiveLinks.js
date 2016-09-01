$.markActiveLinks = (url, element) => {
	if(typeof url === 'object') {
		element = url
		url = undefined
	}

	if(url === undefined)
		url = window.location.pathname

	if(element === undefined)
		element = document.body

	let links = element.querySelectorAll('a')

	for(let i = 0; i < links.length; i++) {
		let link = links[i]
		let href = link.getAttribute('href')

		if(href === url)
			link.classList.add('active')
		else
			link.classList.remove('active')
	}

	$.emit('ActiveLinksMarked')
}