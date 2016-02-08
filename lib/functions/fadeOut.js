aero.fadeOut = function(element) {
	if(!element)
		return
	
	element.classList.remove(aero.fadeInClass)
	element.classList.add(aero.fadeOutClass)
}