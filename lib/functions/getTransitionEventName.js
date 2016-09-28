$.getTransitionEventName = () => {
	let el = document.createElement('fakeelement')

	let transitions = {
		'transition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'MozTransition': 'transitionend',
		'WebkitTransition': 'webkitTransitionEnd'
	}

	for(let key in transitions) {
		if(el.style[key] !== undefined) {
			return transitions[key]
		}
	}
}

$.transitionEventName = $.getTransitionEventName()