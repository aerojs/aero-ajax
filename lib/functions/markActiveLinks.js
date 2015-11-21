kaze.markActiveLinks = function(url) {
	if(url === undefined)
		url = window.location.pathname;

	var links = document.body.querySelectorAll('a');

	for(var i = 0; i < links.length; i++) {
		var link = links[i];
		var href = link.getAttribute('href');

		if(href === url)
			link.classList.add('active');
		else
			link.classList.remove('active');
	}
};