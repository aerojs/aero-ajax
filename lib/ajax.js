window.$ = window.aero = id => document.getElementById(id)

$.lastRequest = null
$.currentUrl = $.originalUrl = window.location.pathname

$.classes = {
	fadeIn: 'fade-in',
	fadeOut: 'fade-out'
}

$.init = function() {
	document.removeEventListener('DOMContentLoaded', $.init)

	$.content = $('content')
	$.loadingAnimation = $('loading-animation')

	$.ajaxifyLinks()
	$.markActiveLinks()
}

// Run
document.addEventListener('DOMContentLoaded', $.init)

// Load history (used on backward and forward button)
window.addEventListener('popstate', e => {
	if(e.state)
		$.load(e.state, false)
	else if($.currentUrl !== $.originalUrl)
		$.load($.originalUrl, false)
})