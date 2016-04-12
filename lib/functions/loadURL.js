$.loadURL = (url, addToHistory) => {
	if($.lastRequest) {
		$.lastRequest.abort()
		$.lastRequest = undefined
	}

	// Cancel pending image requests
	window.stop()

	$.currentURL = url

	if(addToHistory) {
		history.pushState(url, null, url)
	}

	$.contentTransitionEnded = false

	let scrollToTop = () => {
		let parent = $.content

		while(parent = parent.parentElement) {
			parent.scrollTop = 0
		}
	}

	let onTransitionEnd = () => {
		$.contentTransitionEnded = true
		$.content.removeEventListener($.transitionEventName, onTransitionEnd)
	}

	$.content.addEventListener($.transitionEventName, onTransitionEnd)

	$.fadeIn($.loadingAnimation)
	$.fadeOut($.content)

	$.lastRequest = $.get('/_' + url).then(response => {
		$.lastRequest = undefined

		if($.contentTransitionEnded) {
			$.setContent(response)
			scrollToTop()
		} else {
			let replaceContent = () => {
				$.content.removeEventListener($.transitionEventName, replaceContent)
				$.setContent(response)
				scrollToTop()
			}

			$.content.addEventListener($.transitionEventName, replaceContent)

			return
		}
	})

	$.markActiveLinks(url)
}