let onTransitionEnd = e => {
	if(e.target !== $.content)
		return

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

	let onResponse = response => {
		// Ignore old requests (delayed by network)
		if(url !== $.currentURL)
			return

		if($.contentTransitionEnded) {
			$.setContent(response)
			$.scrollToTop()
		} else {
			let replaceContent = e => {
				// Ignore old requests (delayed by CSS transition) and ignore unrelated transitions
				if(url !== $.currentURL || e.target !== $.content)
					return

				$.content.removeEventListener($.transitionEventName, replaceContent)
				$.setContent(response)
				$.scrollToTop()
			}

			$.content.addEventListener($.transitionEventName, replaceContent)
			return
		}
	}

	$.get('/_' + url).then(onResponse).catch(onResponse)

	$.markActiveLinks(url)
}