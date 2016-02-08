aero.clear = function(element) {
	while(element.lastChild) {
		element.removeChild(element.lastChild)
	}
}