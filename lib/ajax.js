window.$ = window.aero = id => document.getElementById(id)

$.originalURL = window.location.pathname
$.currentURL = window.location.pathname
$.lastRequest = null
$.fadeOutClass = 'fade-out'
$.fadeInClass = 'fade-in'

$.init = () => {
	document.removeEventListener('DOMContentLoaded', $.init)

	$.content = $('content')
	$.content.reload = () => {
		return $.get('/_' + location.pathname).then($.setContent)
	}

	$.loadingAnimation = $('loading-animation')

	$.ajaxifyLinks()
	$.markActiveLinks()
}