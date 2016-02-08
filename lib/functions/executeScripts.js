aero.executeScripts = function() {
	let aeroScripts = aero.content.getElementsByTagName('script')

	for(let scriptTag of aeroScripts) {
		if(scriptTag.type !== 'application/json')
			eval(scriptTag.innerHTML)
	}
}