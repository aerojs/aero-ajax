aero.loadURL = function(url, addToHistory) {
	if(aero.lastRequest) {
		aero.lastRequest.abort()
		aero.lastRequest = undefined
	}

	aero.currentURL = url

	if(addToHistory) {
		history.pushState(url, null, url)
	}

	aero.contentTransitionEnded = false

	let scrollToTop = function() {
		let parent = aero.content

		while(parent = parent.parentElement) {
			parent.scrollTop = 0
		}
	}

	let onTransitionEnd = function() {
		aero.contentTransitionEnded = true
		aero.content.removeEventListener(aero.transitionEventName, onTransitionEnd)
	}

	aero.content.addEventListener(aero.transitionEventName, onTransitionEnd)

	aero.fadeIn(aero.loadingAnimation)
	aero.fadeOut(aero.content)

	aero.lastRequest = aero.get('/_' + url).then(function(response) {
		aero.lastRequest = undefined

		if(aero.contentTransitionEnded) {
			aero.setContent(response)
			scrollToTop()
		} else {
			let replaceContent = function() {
				aero.content.removeEventListener(aero.transitionEventName, replaceContent)
				aero.setContent(response)
				scrollToTop()
			}

			aero.content.addEventListener(aero.transitionEventName, replaceContent)

			return
		}
	})

	aero.markActiveLinks(url)
}