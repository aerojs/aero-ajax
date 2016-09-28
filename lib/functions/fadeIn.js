$.fadeIn = element => {
	if(!element)
		return

	element.classList.remove($.classes.fadeOut)
	element.classList.add($.classes.fadeIn)
}