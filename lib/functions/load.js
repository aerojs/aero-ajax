const onTransitionEnd = e => {
	if(e.target !== $.content)
		return

	$.content.removeEventListener($.transitionEventName, onTransitionEnd)
	$.contentTransitionEnded = true
}

const execute = response => {
	$.setContent(response)
	$.scrollToTop()
}

$.load = (url, addToHistory = true) => {
	if($.lastRequest) {
		$.lastRequest.abort()
		$.lastRequest = null
	}

	$.currentUrl = url

	if(addToHistory)
		history.pushState(url, null, url)

	$.contentTransitionEnded = false
	$.content.addEventListener($.transitionEventName, onTransitionEnd)

	$.fadeIn($.loadingAnimation)
	$.fadeOut($.content)

	let onResponse = response => {
		// Ignore old requests (delayed by network)
		if(url !== $.currentUrl)
			return

		if($.contentTransitionEnded) {
			execute(response)
		} else {
			let replace = e => {
				if(e.target !== $.content)
					return

				// We can only remove the event listener AFTER we found the right target.
				// This is because the event is triggered multiple times for different targets.
				$.content.removeEventListener($.transitionEventName, replace)

				// Ignore old requests (delayed by CSS transition) and ignore unrelated transitions
				if(url !== $.currentUrl)
					return

				execute(response)
			}

			$.content.addEventListener($.transitionEventName, replace)
		}
	}

	$.get('/_' + url).then(onResponse).catch(onResponse)

	$.markActiveLinks(url)
}