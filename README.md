jquery-restify
==============

A plugin to restify your form  with a damn simple form validation framework


Installation
---
Include the file with jquery in a script tag:
```html
<script src="jquery.js"></script>
<script src="jquery-restify.js"></script>
```

Usage
--------
Restify your form
```javascript
$('#formid').restify();
```

Options
--------
###root
Root element name. Default is the name of the form
###url
Url of the REST API. Default is the ***action*** parameter of the form
###type
HTTP method. Default is the ***method*** parameter of the form
###excluded
array of string. Elements with name in this array will not be jsonify nor send
###callback
callback function
