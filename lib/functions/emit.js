aero.emit = eventName => {
	document.dispatchEvent(new Event(eventName, {
		'bubbles': true,
		'cancelable': true
	}))
}