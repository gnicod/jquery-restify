jquery-restify
==============
[![Build Status](https://travis-ci.org/gnicod/jquery-restify.png?branch=master)](https://travis-ci.org/gnicod/jquery-restify)

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
Root element name. Default is the ***name*** of the form
###url
Url of the REST API. Default is the ***action*** parameter of the form
###type
HTTP method. Default is the ***method*** parameter of the form
###excluded
array of string. Elements with name in this array will not be jsonify nor send
###callback
callback function
###append
object to append to json
###preprocess
example
```javascript
$('#formid').restify({
	"preprocess":{
		"field1":function(obj){
			return "prepend:"+obj;
		}
	}
}
```


Form validation
-------
```javascript
$('#formid').restify({
	"fields":{
		"#field1": {
			"required" : false,
			"regexp":{"pattern":"([a-zA-Z0-9])","message":"Should contains only alphanumeric caracters"},
			"custom":{"fn":"nameChck","message":"Should contains at least 5 characters"},
			"min-length":5,
			"max-length":10
		}
	}
});
```
