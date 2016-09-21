// Run
document.addEventListener('DOMContentLoaded', $.init)

// Load history (used on backward and forward button)
window.addEventListener('popstate', e => {
	let url = e.state

	if(url) {
		$.loadURL(url, false)
	} else if($.currentURL !== $.originalURL) {
		$.loadURL($.originalURL, false)
	}
})