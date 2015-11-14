var kaze = {};

kaze.fadeSpeed = 150;
kaze.$navigation = $('#navigation');
kaze.$container = $('#container');
kaze.content = document.getElementById('content');
kaze.loadingAnimation = document.getElementById('loading-animation');
kaze.originalURL = window.location.pathname;
kaze.currentURL = kaze.originalURL;
kaze.lastRequest = null;

kaze.ajaxifyLinks = function() {
	$('.ajax').each(function() {
		this.classList.remove('ajax');
	}).click(function(e) {
		var url = this.getAttribute('href');

		e.preventDefault();
		e.stopPropagation();

		if(url === window.location.pathname)
			return;

		//if(kaze.$navigation && kaze.$navigation.offset().top < 0)
		//	kaze.scrollToElement(kaze.$navigation);

		kaze.loadURL(url, true);
	});
};

kaze.emit = function(eventName) {
	document.dispatchEvent(new Event(eventName, {
		'bubbles': true,
		'cancelable': true
	}));
};

kaze.fadeIn = function(element) {
	element.classList.remove('fade-out');
	element.classList.add('fade-in');
};

kaze.fadeOut = function(element) {
	element.classList.remove('fade-in');
	element.classList.add('fade-out');
};

kaze.scrollToElement = function(element, time) {
	time = (time !== undefined) ? time : kaze.fadeSpeed * 2;

	kaze.$container.animate({
		scrollTop: kaze.$container.scrollTop() + element.offset().top
	}, time);
};

kaze.loadURL = function(url, addToHistory) {
	if(kaze.lastRequest) {
		kaze.lastRequest.abort();
		kaze.lastRequest = null;
	}

	kaze.currentURL = url;

	if(addToHistory) {
		history.pushState(url, null, url);
	}

	// var onTransitionEnd = function() {
	// 	console.log('Transition ended!');
	// };
	// kaze.content.addEventListener('webkitTransitionEnd', onTransitionEnd, false);

	kaze.fadeIn(kaze.loadingAnimation);
	kaze.fadeOut(kaze.content);

	kaze.lastRequest = $.get('/_' + url, function(response) {
		kaze.lastRequest = null;
		// kaze.content.removeEventListener('webkitTransitionEnd', onTransitionEnd, false);

		if(kaze.fadeSpeed === 0) {
			kaze.content.innerHTML = response;
			kaze.ajaxifyLinks();
			kaze.emit('DOMContentLoaded');
			return
		}

		kaze.content.innerHTML = response;
		kaze.ajaxifyLinks();
		kaze.emit('DOMContentLoaded');

		kaze.fadeIn(kaze.content);
		kaze.fadeOut(kaze.loadingAnimation);
	});

	kaze.markActiveLinks(url);
};

kaze.markActiveLinks = function(url) {
	if(url === undefined)
		url = window.location.pathname;

	$('a').each(function() {
		var $this = $(this);
		var href = $this.attr('href');

		if(href === url) {
			$this.addClass('active');
		} else {
			$this.removeClass('active');
		}
	});
};

// Run
kaze.ajaxifyLinks();
kaze.markActiveLinks();

// Load history (used on backward and forward button)
window.addEventListener('popstate', function(e) {
	var url = e.state;

	if(url) {
		kaze.loadURL(url, false);
	} else if(kaze.currentURL !== kaze.originalURL) {
		kaze.loadURL(kaze.originalURL, false);
	}
});
