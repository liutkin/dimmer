# 🕶️ Dimmer

[![npm version](https://img.shields.io/npm/v/dimmer.svg)](https://www.npmjs.com/package/dimmer)

<br />

* [What is Dimmer](#what-is-dimmer)
* [Getting started](#getting-started)
  * [CDN](#cdn)
  * [Download](#download)
  * [NPM](#npm)
* [API](#api)
  * [Usage](#usage)
  * [Attributes](#attributes)
  * [Options](#options)
  * [Events](#events)
* [License](#license)

<br />

# What is Dimmer

Dimmer is a simple JavaScript dialog with ability to pass dynamic data via data attribute declaratively.

- No default styling
- No dependencies
- `onShow` and `onHide` hooks
- 🔥 `0.8 kB` gziped

<br />

# Getting started

## CDN

Place the latest production bundle before the closing `</body>` and call dialog `init`:
```html
<script src="https://unpkg.com/dimmer"></script>
<script>
  var dialog = dimmer();
  dialog.init();
</script>
```
## Download
Download [`dimmer.js`](https://raw.githubusercontent.com/lyutkin/dimmer/master/dist/dimmer.js) or minified production ready [`dimmer.min.js`](https://raw.githubusercontent.com/lyutkin/dimmer/master/dist/dimmer.min.js). Place it before the closing `</body>` and call dialog `init`:
```html
<script src="script/dimmer.min.js"></script>
<script>
  var dialog = dimmer();
  dialog.init();
</script>
```

## NPM
Install package with `npm install dimmer`. Call `init`:
```javascript
import dimmer from 'dimmer';

const dialog = dimmer();
dialog.init();
```

<br />

# API

## Usage

Use `data` attributes to declare dialog trigger and markup.
```html
<button type="button" data-dialog-open="info">Open info dialog</button>

<div data-dialog="info" style="display: none;">
  <h3>Info dialog</h3>
  <a href="#" data-dialog-close>Close this dialog</a>
</div>
```

You can pass valid `JSON` via `data-dialog-payload` attribute. Below given `JSON` fields values will be injected in dialog markup upon dialog showing.
```html
<button
  type="button"
  data-dialog-open="info"
  data-dialog-payload='[{"field": "title", "type": "text", "value": "Info"}, {"field": "greeting", "type": "value", "value": "Hello"}]'
>Open info dialog</button>

<div data-dialog="info" style="display: none;">
  <h3 data-dialog-field="title"></h3>
  <input
    type="text"
    data-dialog-field="greeting"
    data-dialog-autofocus
  >
  <a href="#" data-dialog-close>Close this dialog</a>
</div>
```

## Attributes

**Attribute**: `data-dialog-open`  
**Value**: Dialog name.  
**Placement**: Any element.  
**Description**: Element with this attribute on click will open up named dialog.

---

**Attribute**: `data-dialog-payload`  
**Value**: Valid `JSON` string.  
**Placement**: Element with `data-dialog-open` attribute.  
**Description**: `JSON` string should be array of objects. Each object describes a field that relates to the corresponding element with `data-dialog-field` attribute inside dialog markup. All object keys are mandatory:
- `field`: `String`. Specifies corresponding value of element's `data-dialog-field` attribute inside dialog.
- `type`: `String ["text"|"value"]`.
  - `text` will replace inner text of element with provided payload.
  - `value` will set value of element to the provided payload.
- `payload`: Any. Payload value will overwrite element's inner text or value (according to given `type`).

So basically, object...
```javascript
{
  "field": "title",
  "type": "text",
  "payload": "Hello world"
}
```
...will find element with `data-dialog-field="title"` attribute inside dialog and set its inner text to the `Hello world` (`payload` value).

---

**Attribute**: `data-dialog`  
**Value**: Dialog name.  
**Placement**: Element that represents dialog.  
**Description**: Visibility will be triggered via element with `data-dialog-open` attribute.

---

**Attribute**: `data-dialog-field`  
**Value**: Field name.  
**Placement**: Element that accepts dynamic data.  
**Description**: Inner text or value of this element will be overwritten upon dialog showing with object data passed via `data-dialog-payload` attribute of dialog trigger element.

---

**Attribute**: `data-dialog-close`  
**Value**: *None*.  
**Placement**: Any element inside dialog.  
**Description**: Click on this element will set to `display: none` the closest parent element with `data-dialog` attribute.

---

**Attribute**: `data-dialog-autofocus`  
**Value**: *None*.  
**Placement**: Any focusable element inside dialog.  
**Description**: Element with this attribute gets focused after dialog being shown. *(Tip: Useful for inputs)*

---

## Options

Pass options object to `init` function. E.g.:
```javascript
var dialog = dimmer();

dialog.init({
  dialogActiveBodyClass: 'dialog-active'
})
```

<br />

| Key  | Type  | Default | Description |
| - | - | - | - |
| `dialogActiveBodyClass` | `String` | `false` | Add specified class name to the `body` element when dialog is being shown. |

## Events

Syntax:
```
dialog.event(name, function callback([dialogElement]) {
  // your code
});
```

Description:
- `dialog` is a dimmer instance object.
- `event` represents the event type.
  - `onShow` fires after dialog being shown.
  - `onHide` fires after dialog being hidden.
- `name` refers to dialog name declared via `data-dialog` attribute.
- `callback` takes dialog DOM element as argument.

Examples:
```javascript
var dialog = dimmer();

dialog.init();
dialog.onShow('info', function(dialogElement) {
  console.log('Info dialog shown', dialogElement);
})
```

```javascript
var dialog = dimmer();

dialog.init();
dialog.onHide('video', function(dialogElement) {
  console.log('Video dialog hidden', dialogElement);
})
```

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
