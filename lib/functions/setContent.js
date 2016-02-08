aero.setContent = response => {
	aero.content.innerHTML = response

	aero.fadeIn(aero.content)
	aero.fadeOut(aero.loadingAnimation)

	aero.ajaxifyLinks()
	aero.markActiveLinks(aero.content)

	aero.executeScripts()
	aero.emit('DOMContentLoaded')
}