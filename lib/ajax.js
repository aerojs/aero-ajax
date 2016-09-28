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

	// Make content listen to 'transition end' events
	$.content.addEventListener($.getTransitionEventName(), e => {
		// We get 'transition end' events for child elements, too.
		// Make sure we only care about events on the content element.
		if(e.target !== $.content)
			return

		// We also get a 'transition end' event for fade-in animations.
		// We'll ignore these as well.
		if(!e.target.classList.contains($.classes.fadeOut))
			return

		// If the AJAX response arrived early we can instantly use it.
		if($.content.response) {
			$.setContent($.content.response)
			$.scrollToTop()
			return
		}

		// Set the flag so that when the AJAX response arrives it will be instantly used.
		$.content.transitionEnded = true
	})

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