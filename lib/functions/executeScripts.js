kaze.executeScripts = function() {
	var aeroScripts = kaze.content.getElementsByTagName('script');

	for(var n = 0; n < aeroScripts.length; n++) {
		var scriptTag = aeroScripts[n];

		if(scriptTag.type !== 'application/json')
			eval(scriptTag.innerHTML);
	}
};