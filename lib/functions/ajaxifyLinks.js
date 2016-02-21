$.ajaxifyLinks = () => {
	let links = document.body.querySelectorAll('.ajax')

	for(let i = 0; i < links.length; i++) {
		let link = links[i]

		link.classList.remove('ajax')

		link.onclick = function(e) {
			// Middle mouse button should have standard behaviour
			if(e.which === 2)
				return

			let url = this.getAttribute('href')

			e.preventDefault()
			e.stopPropagation()

			if(url === window.location.pathname)
				return

			//if($.$navigation && $.$navigation.offset().top < 0)
			//	$.scrollToElement($.$navigation)

			$.loadURL(url, true)
		}
	}
}