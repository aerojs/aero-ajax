aero.emit = function(eventName) {
	document.dispatchEvent(new Event(eventName, {
		'bubbles': true,
		'cancelable': true
	}))
}