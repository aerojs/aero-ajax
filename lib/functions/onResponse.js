kaze.onResponse = function(response) {
	kaze.content.innerHTML = response;
	kaze.executeScripts();
	kaze.emit('DOMContentLoaded');
	kaze.fadeIn(kaze.content);
	kaze.fadeOut(kaze.loadingAnimation);
};