kaze.fadeOut = function(element) {
	if(!element)
		return
	
	element.classList.remove(kaze.fadeInClass);
	element.classList.add(kaze.fadeOutClass);
};