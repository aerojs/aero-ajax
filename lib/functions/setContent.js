$.setContent = response => {
	$.content.innerHTML = response

	$.fadeIn($.content)
	$.fadeOut($.loadingAnimation)

	$.ajaxifyLinks()
	$.markActiveLinks($.content)

	$.executeScripts()
	$.emit('DOMContentLoaded')
}