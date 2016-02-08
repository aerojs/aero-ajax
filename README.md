# aero-ajax
Lightweight ajaxification plugin for [Aero](https://github.com/aerojs/aero) using high-performance CSS transitions.

## Installation
Add `aero-ajax` to `dependencies` in your `package.json`:

```json
"dependencies": {
	"aero-ajax": "*"
}
```

## Preparation

### Summary
You need to define your `main` element with the ID `content` in your layout template:

```jade
main#content!= content
```

However this plugin requires user-defined CSS transitions for enhanced performance and flexibility. Therefore you also need to add a `fade` class:

```jade
main#content.fade!= content
```

Then define which animation you want for page swaps. Add `fade.styl` in `styles`:

```stylus
.fade
	opacity 1
	will-change opacity
	transition opacity 200ms ease

.fade-out
	opacity 0
```

## Usage
Let's say you have a link on your page:

```jade
a(href='/contact') Contact
```

Simply add the `ajax` class to make it load the page via AJAX requests:

```jade
a.ajax(href='/contact') Contact
```