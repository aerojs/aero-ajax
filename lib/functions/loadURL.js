let onTransitionEnd = () => {
	$.contentTransitionEnded = true
	$.content.removeEventListener($.transitionEventName, onTransitionEnd)
}

$.loadURL = (url, addToHistory) => {
	if($.lastRequest) {
		$.lastRequest.abort()
		$.lastRequest = null
	}

	$.currentURL = url

	if(addToHistory)
		history.pushState(url, null, url)

	$.contentTransitionEnded = $.content.classList.contains($.fadeOutClass)
	$.content.addEventListener($.transitionEventName, onTransitionEnd)

	$.fadeIn($.loadingAnimation)
	$.fadeOut($.content)

	$.get('/_' + url).then(response => {
		// Ignore old requests (delayed by network)
		if(url !== $.currentURL)
			return

		if($.contentTransitionEnded) {
			$.setContent(response)
			$.scrollToTop()
		} else {
			let replaceContent = () => {
				// Ignore old requests (delayed by CSS transition)
				if(url !== $.currentURL)
					return

				$.content.removeEventListener($.transitionEventName, replaceContent)
				$.setContent(response)
				$.scrollToTop()
			}

			$.content.addEventListener($.transitionEventName, replaceContent)

			return
		}
	})

	$.markActiveLinks(url)
}