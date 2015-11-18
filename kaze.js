var kaze = {};

kaze.content = document.getElementById('content');
kaze.loadingAnimation = document.getElementById('loading-animation');
kaze.originalURL = window.location.pathname;
kaze.currentURL = kaze.originalURL;
kaze.lastRequest = null;

//kaze.$navigation = $('#navigation');
//kaze.$container = $('#container');

kaze.ajaxifyLinks = function() {
	var links = document.body.querySelectorAll('.ajax');

	for(var i = 0; i < links.length; i++) {
		var link = links[i];

		link.classList.remove('ajax');

		link.onclick = function(e) {
			var url = this.getAttribute('href');

			e.preventDefault();
			e.stopPropagation();

			if(url === window.location.pathname)
				return;

			//if(kaze.$navigation && kaze.$navigation.offset().top < 0)
			//	kaze.scrollToElement(kaze.$navigation);

			kaze.loadURL(url, true);
		};
	}
};

kaze.emit = function(eventName) {
	document.dispatchEvent(new Event(eventName, {
		'bubbles': true,
		'cancelable': true
	}));
};

kaze.fadeIn = function(element) {
	element.classList.remove('kaze-fade-out');
	element.classList.add('kaze-fade-in');
};

kaze.fadeOut = function(element) {
	element.classList.remove('kaze-fade-in');
	element.classList.add('kaze-fade-out');
};

kaze.get = function(url, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
		if(request.status >= 200 && request.status < 400) {
			callback(request.responseText);
		}
	};

	request.onerror = function() {
		console.error('Error requesting ' + url);
	};

	request.send();

	return request;
};

kaze.getJSON = function(url, callback) {
	return kaze.get(url, function(raw) {
		callback(JSON.parse(raw));
	});
};

/*kaze.scrollToElement = function(element, time) {
	time = (time !== undefined) ? time : kaze.fadeSpeed * 2;

	kaze.$container.animate({
		scrollTop: kaze.$container.scrollTop() + element.offset().top
	}, time);
};*/

kaze.executeScripts = function() {
	var aeroScripts = kaze.content.getElementsByTagName('script');

	for(var n = 0; n < aeroScripts.length; n++)
		eval(aeroScripts[n].innerHTML);
}

kaze.getTransitionEventName = function() {
    var el = document.createElement('fakeelement');
    var transitions = {
		'transition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'MozTransition': 'transitionend',
		'WebkitTransition': 'webkitTransitionEnd'
	};

    for(var t in transitions) {
        if(el.style[t] !== undefined) {
            return transitions[t];
        }
    }
};

kaze.loadURL = function(url, addToHistory) {
	if(kaze.lastRequest) {
		kaze.lastRequest.abort();
		kaze.lastRequest = undefined;
	}

	kaze.currentURL = url;

	if(addToHistory) {
		history.pushState(url, null, url);
	}

	kaze.contentTransitionEnded = false;

	var transitionEventName = kaze.getTransitionEventName();

	var onTransitionEnd = function() {
		kaze.contentTransitionEnded = true;
		kaze.content.removeEventListener(transitionEventName, onTransitionEnd);
	};

	kaze.content.addEventListener(transitionEventName, onTransitionEnd);

	kaze.fadeIn(kaze.loadingAnimation);
	kaze.fadeOut(kaze.content);

	kaze.lastRequest = kaze.get('/_' + url, function(response) {
		kaze.lastRequest = undefined;

		if(kaze.contentTransitionEnded) {
			kaze.onResponse(response);
		} else {
			var replaceContent = function() {
				kaze.content.removeEventListener(transitionEventName, replaceContent);
				kaze.onResponse(response);
			};

			kaze.content.addEventListener(transitionEventName, replaceContent);

			return;
		}
	});

	kaze.markActiveLinks(url);
};

kaze.onResponse = function(response) {
	kaze.content.innerHTML = response;
	kaze.executeScripts();
	kaze.ajaxifyLinks();
	kaze.emit('DOMContentLoaded');
	kaze.fadeIn(kaze.content);
	kaze.fadeOut(kaze.loadingAnimation);
}

kaze.markActiveLinks = function(url) {
	if(url === undefined)
		url = window.location.pathname;

	var links = document.body.querySelectorAll('a');

	for(var i = 0; i < links.length; i++) {
		var link = links[i];
		var href = link.getAttribute('href');

		if(href === url)
			link.classList.add('active');
		else
			link.classList.remove('active');
	}
};

// Run
document.addEventListener('DOMContentLoaded', function() {
	kaze.ajaxifyLinks();
	kaze.markActiveLinks();
});

// Load history (used on backward and forward button)
window.addEventListener('popstate', function(e) {
	var url = e.state;

	if(url) {
		kaze.loadURL(url, false);
	} else if(kaze.currentURL !== kaze.originalURL) {
		kaze.loadURL(kaze.originalURL, false);
	}
});
