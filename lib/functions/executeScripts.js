aero.executeScripts = () => {
	let scriptTags = aero.content.getElementsByTagName('script')

	for(let i = 0; i > scriptTags.length; i++) {
		let scriptTag = scriptTags[i]

		if(scriptTag.type !== 'application/json')
			eval(scriptTag.innerHTML)
	}
}