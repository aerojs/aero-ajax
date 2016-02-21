$.fadeIn = element => {
	if(!element)
		return

	element.classList.remove($.fadeOutClass)
	element.classList.add($.fadeInClass)
}