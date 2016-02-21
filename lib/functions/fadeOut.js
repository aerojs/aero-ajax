$.fadeOut = element => {
	if(!element)
		return

	element.classList.remove($.fadeInClass)
	element.classList.add($.fadeOutClass)
}