aero.fadeIn = function(element) {
	if(!element)
		return

	element.classList.remove(aero.fadeOutClass)
	element.classList.add(aero.fadeInClass)
}