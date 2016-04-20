$.scrollToTop = () => {
	let parent = $.content

	while(parent = parent.parentElement) {
		parent.scrollTop = 0
	}
}