kaze.loadURL = function(url, addToHistory) {
	if(kaze.lastRequest) {
		kaze.lastRequest.abort();
		kaze.lastRequest = undefined;
	}

	kaze.currentURL = url;

	if(addToHistory) {
		history.pushState(url, null, url);
	}

	kaze.contentTransitionEnded = false;

	var scrollToTop = function() {
		var parent = kaze.content;

		while(parent = parent.parentElement) {
			parent.scrollTop = 0;
		}
	};

	var onTransitionEnd = function() {
		kaze.contentTransitionEnded = true;
		kaze.content.removeEventListener(kaze.transitionEventName, onTransitionEnd);
	};

	kaze.content.addEventListener(kaze.transitionEventName, onTransitionEnd);

	kaze.fadeIn(kaze.loadingAnimation);
	kaze.fadeOut(kaze.content);

	kaze.lastRequest = kaze.get('/_' + url).then(function(response) {
		kaze.lastRequest = undefined;

		if(kaze.contentTransitionEnded) {
			kaze.setContent(response);
			scrollToTop();
		} else {
			var replaceContent = function() {
				kaze.content.removeEventListener(kaze.transitionEventName, replaceContent);
				kaze.setContent(response);
				scrollToTop();
			};

			kaze.content.addEventListener(kaze.transitionEventName, replaceContent);

			return;
		}
	});

	kaze.markActiveLinks(url);
};