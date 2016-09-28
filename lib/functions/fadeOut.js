$.fadeOut = element => {
	if(!element)
		return

	element.classList.remove($.classes.fadeIn)
	element.classList.add($.classes.fadeOut)
}