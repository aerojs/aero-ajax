var kaze = {
	originalURL: window.location.pathname,
	currentURL: window.location.pathname,
	lastRequest: null,
	fadeOutClass: 'fade-out',
	fadeInClass: 'fade-in',

	init: function() {
		document.removeEventListener('DOMContentLoaded', kaze.init);

		kaze.content = document.getElementById('content');
		kaze.loadingAnimation = document.getElementById('loading-animation');

		kaze.content.reload = function() {
			return kaze.get('/_' + location.pathname).then(kaze.onResponse);
		};

		kaze.ajaxifyLinks();
		kaze.markActiveLinks();
	}
};

// Run
document.addEventListener('DOMContentLoaded', kaze.init);

// Load history (used on backward and forward button)
window.addEventListener('popstate', function(e) {
	var url = e.state;

	if(url) {
		kaze.loadURL(url, false);
	} else if(kaze.currentURL !== kaze.originalURL) {
		kaze.loadURL(kaze.originalURL, false);
	}
});