kaze.fadeIn = function(element) {
	if(!element)
		return

	element.classList.remove(kaze.fadeOutClass);
	element.classList.add(kaze.fadeInClass);
};