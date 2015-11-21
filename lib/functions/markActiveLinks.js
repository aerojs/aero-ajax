kaze.markActiveLinks = function(url, element) {
	if(typeof url === "object") {
		element = url
		url = undefined
	}

	if(url === undefined)
		url = window.location.pathname;

	if(element === undefined)
		element = document.body;

	var links = element.querySelectorAll('a');

	for(var i = 0; i < links.length; i++) {
		var link = links[i];
		var href = link.getAttribute('href');

		if(href === url)
			link.classList.add('active');
		else
			link.classList.remove('active');
	}
};