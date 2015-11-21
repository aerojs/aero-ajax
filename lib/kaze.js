var kaze = {
	originalURL: window.location.pathname,
	currentURL: window.location.pathname,
	lastRequest: null,
	fadeOutClass: 'fade-out',
	fadeInClass: 'fade-in'
};

//kaze.$navigation = $('#navigation');
//kaze.$container = $('#container');

/*kaze.scrollToElement = function(element, time) {
	time = (time !== undefined) ? time : kaze.fadeSpeed * 2;

	kaze.$container.animate({
		scrollTop: kaze.$container.scrollTop() + element.offset().top
	}, time);
};*/

// Run
document.addEventListener('DOMContentLoaded', function() {
	kaze.content = document.getElementById('content');
	kaze.loadingAnimation = document.getElementById('loading-animation');

	kaze.ajaxifyLinks();
	kaze.markActiveLinks();
});

// Load history (used on backward and forward button)
window.addEventListener('popstate', function(e) {
	var url = e.state;

	if(url) {
		kaze.loadURL(url, false);
	} else if(kaze.currentURL !== kaze.originalURL) {
		kaze.loadURL(kaze.originalURL, false);
	}
});
