aero.getTransitionEventName = () => {
	let el = document.createElement('fakeelement')
	let transitions = {
		'transition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'MozTransition': 'transitionend',
		'WebkitTransition': 'webkitTransitionEnd'
	}

	for(let t in transitions) {
		if(el.style[t] !== undefined) {
			return transitions[t]
		}
	}
}

aero.transitionEventName = aero.getTransitionEventName()