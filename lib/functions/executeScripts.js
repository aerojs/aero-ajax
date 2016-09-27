$.executeScripts = element => {
	if(!element)
		element = $.content

	let scriptTags = element.getElementsByTagName('script')

	for(let i = 0; i < scriptTags.length; i++) {
		let scriptTag = scriptTags[i]

		if(scriptTag.type !== 'application/json' && scriptTag.type !== 'application/ld+json') {
			new Function(scriptTag.innerHTML)()
		}
	}
}