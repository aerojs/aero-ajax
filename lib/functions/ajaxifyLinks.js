kaze.ajaxifyLinks = function() {
	var links = document.body.querySelectorAll('.ajax');

	for(var i = 0; i < links.length; i++) {
		var link = links[i];

		link.classList.remove('ajax');

		link.onclick = function(e) {
			var url = this.getAttribute('href');

			e.preventDefault();
			e.stopPropagation();

			if(url === window.location.pathname)
				return;

			//if(kaze.$navigation && kaze.$navigation.offset().top < 0)
			//	kaze.scrollToElement(kaze.$navigation);

			kaze.loadURL(url, true);
		};
	}
};