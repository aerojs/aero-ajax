aero.executeScripts = function() {
	let aeroScripts = aero.content.getElementsByTagName('script')

	for(let n = 0 n < aeroScripts.length n++) {
		let scriptTag = aeroScripts[n]

		if(scriptTag.type !== 'application/json')
			eval(scriptTag.innerHTML)
	}
}