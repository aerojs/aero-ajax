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

	$.content.reload = () => {
		return $.get('/_' + location.pathname).then($.setContent)
	}

	$.ajaxifyLinks()
	$.markActiveLinks()
}