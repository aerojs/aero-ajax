aero.clear = element => {
	while(element.lastChild) {
		element.removeChild(element.lastChild)
	}
}