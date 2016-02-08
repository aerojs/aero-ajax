let _ajax = {
	originalURL: window.location.pathname,
	currentURL: window.location.pathname,
	lastRequest: null,
	fadeOutClass: 'fade-out',
	fadeInClass: 'fade-in',

	initAJAX: function() {
		document.removeEventListener('DOMContentLoaded', aero.initAJAX)

		aero.content = document.getElementById('content')
		aero.loadingAnimation = document.getElementById('loading-animation')

		aero.content.reload = function() {
			return aero.get('/_' + location.pathname).then(aero.setContent)
		}

		aero.ajaxifyLinks()
		aero.markActiveLinks()
	}
}

// Mix it into the aero namespace
if(!aero)
	var aero = _ajax
else
	Object.assign(aero, _ajax)

// Run
document.addEventListener('DOMContentLoaded', aero.initAJAX)

// Load history (used on backward and forward button)
window.addEventListener('popstate', function(e) {
	let url = e.state

	if(url) {
		aero.loadURL(url, false)
	} else if(aero.currentURL !== aero.originalURL) {
		aero.loadURL(aero.originalURL, false)
	}
})