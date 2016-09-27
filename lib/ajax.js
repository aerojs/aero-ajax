window.$ = window.aero = id => document.getElementById(id)

$.originalURL = window.location.pathname
$.currentURL = window.location.pathname
$.lastRequest = null
$.fadeOutClass = 'fade-out'
$.fadeInClass = 'fade-in'

$.init = () => {
	document.removeEventListener('DOMContentLoaded', $.init)

	$.content = $('content')
	$.content.reload = () => $.get('/_' + location.pathname).then($.setContent)

	$.loadingAnimation = $('loading-animation')

	// Move page style
	let pageStyle = $('aero-page-style')
	if(pageStyle)
		$.content.appendChild(pageStyle)

	$.ajaxifyLinks()
	$.markActiveLinks()
}

// Run
document.addEventListener('DOMContentLoaded', $.init)

// Load history (used on backward and forward button)
window.addEventListener('popstate', e => {
	let url = e.state

	if(url) {
		$.loadURL(url, false)
	} else if($.currentURL !== $.originalURL) {
		$.loadURL($.originalURL, false)
	}
})