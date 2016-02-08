aero.fadeIn = element => {
	if(!element)
		return

	element.classList.remove(aero.fadeOutClass)
	element.classList.add(aero.fadeInClass)
}