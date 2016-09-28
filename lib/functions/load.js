$.load = (url, addToHistory = true) => {
	if($.lastRequest) {
		$.lastRequest.abort()
		$.lastRequest = null
	}

	$.currentUrl = url

	if(addToHistory)
		history.pushState(url, null, url)

	$.content.response = null
	$.content.transitionEnded = false

	$.fadeIn($.loadingAnimation)
	$.fadeOut($.content)

	let onResponse = response => {
		// We got our AJAX response now.
		// The user could have clicked on another menu item meanwhile.
		// If that's the case $.currentUrl will be different from url.
		// We can safely ignore the response for this request and return.
		if(url !== $.currentUrl)
			return

		// If the response took more time than the CSS transition
		// we can use the response immediately.
		if($.content.transitionEnded) {
			$.setContent(response)
			$.scrollToTop()
			return
		}

		// If the response was faster than our CSS transition
		// we can set $.content.response to our response object.
		// It will later be used in the 'transitionend' event handler.
		$.content.response = response
	}

	$.get('/_' + url).then(onResponse).catch(onResponse)
	$.markActiveLinks(url)
}