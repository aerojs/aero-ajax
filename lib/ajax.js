window.$ = window.aero = id => document.getElementById(id)

$.originalURL = window.location.pathname
$.currentURL = window.location.pathname
$.lastRequest = null
$.fadeOutClass = 'fade-out'
$.fadeInClass = 'fade-in'

$.initAJAX = () => {
	document.removeEventListener('DOMContentLoaded', $.initAJAX)

	$.content = document.getElementById('content')
	$.loadingAnimation = document.getElementById('loading-animation')

	// Default transition
	if(!window.getComputedStyle($.content).transition) {
		let style = document.createElement('style')
		style.type = 'text/css'
		style.innerHTML = '.fade { opacity: 1; will-change: opacity; transition: opacity 200ms ease; } .fade-out { opacity: 0; }'
		document.getElementsByTagName('head')[0].appendChild(style)

		$.content.classList.add('fade')
	}

	$.content.reload = () => {
		return $.get('/_' + location.pathname).then($.setContent)
	}

	$.ajaxifyLinks()
	$.markActiveLinks()
}