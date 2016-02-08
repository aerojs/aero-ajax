aero.loadURL = (url, addToHistory) => {
	if(aero.lastRequest) {
		aero.lastRequest.abort()
		aero.lastRequest = undefined
	}

	aero.currentURL = url

	if(addToHistory) {
		history.pushState(url, null, url)
	}

	aero.contentTransitionEnded = false

	let scrollToTop = () => {
		let parent = aero.content

		while(parent = parent.parentElement) {
			parent.scrollTop = 0
		}
	}

	let onTransitionEnd = () => {
		aero.contentTransitionEnded = true
		aero.content.removeEventListener(aero.transitionEventName, onTransitionEnd)
	}

	aero.content.addEventListener(aero.transitionEventName, onTransitionEnd)

	aero.fadeIn(aero.loadingAnimation)
	aero.fadeOut(aero.content)

	aero.lastRequest = aero.get('/_' + url).then(response => {
		aero.lastRequest = undefined

		if(aero.contentTransitionEnded) {
			aero.setContent(response)
			scrollToTop()
		} else {
			let replaceContent = () => {
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