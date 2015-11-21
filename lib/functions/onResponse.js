kaze.onResponse = function(response) {
	kaze.content.innerHTML = response;

	kaze.fadeIn(kaze.content);
	kaze.fadeOut(kaze.loadingAnimation);

	kaze.ajaxifyLinks();
	kaze.markActiveLinks(kaze.content);

	kaze.executeScripts();
	kaze.emit('DOMContentLoaded');
};