$.setContent = response => {
	$.content.innerHTML = response

	$.fadeIn($.content)
	$.fadeOut($.loadingAnimation)

	$.ajaxifyLinks($.content)
	$.markActiveLinks($.content)
	$.executeScripts($.content)

	$.emit('DOMContentLoaded')
}