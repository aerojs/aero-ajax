$.executeScripts = () => {
	let scriptTags = $.content.getElementsByTagName('script')

	for(let i = 0; i < scriptTags.length; i++) {
		let scriptTag = scriptTags[i]

		if(scriptTag.type !== 'application/json')
			eval(scriptTag.innerHTML)
	}
}