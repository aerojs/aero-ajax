let onLinkClick = function(e) {
	// Middle mouse button should have standard behaviour
	if(e.which === 2)
		return

	let url = this.getAttribute('href')

	e.preventDefault()
	e.stopPropagation()

	if(url === window.location.pathname)
		return

	$.loadURL(url, true)
}

$.ajaxifyLinks = element => {
	if(!element)
		element = document.body

	let links = element.querySelectorAll('.ajax')

	for(let i = 0; i < links.length; i++) {
		let link = links[i]

		link.classList.remove('ajax')
		link.onclick = onLinkClick
	}
}