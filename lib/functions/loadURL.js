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

	var onTransitionEnd = function() {
		kaze.contentTransitionEnded = true;
		kaze.content.removeEventListener(kaze.transitionEventName, onTransitionEnd);
	};

	kaze.content.addEventListener(kaze.transitionEventName, onTransitionEnd);

	kaze.fadeIn(kaze.loadingAnimation);
	kaze.fadeOut(kaze.content);

	kaze.lastRequest = kaze.get('/_' + url, function(response) {
		kaze.lastRequest = undefined;

		if(kaze.contentTransitionEnded) {
			kaze.onResponse(response);
		} else {
			var replaceContent = function() {
				kaze.content.removeEventListener(kaze.transitionEventName, replaceContent);
				kaze.onResponse(response);
			};

			kaze.content.addEventListener(kaze.transitionEventName, replaceContent);

			return;
		}
	});

	kaze.markActiveLinks(url);
};