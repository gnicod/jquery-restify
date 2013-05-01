var Browser = require("zombie");
var assert = require("assert");

// Load the page from localhost
browser = new Browser();
browser.visit("file:///home/ovski/DEV/jquery-restify/test/index.html", function () {

	var jquery = browser.window.jQuery;

  // Fill email, password and submit form
  browser.
    fill("field1", "zombie@underworld.dead").
    fill("field2", "eat-the-living").
    pressButton("submit", function() {
			var json = browser.window.gjson;
			console.log(json);
			console.log(jquery.parseJSON(json));
      //assert.equal(json, "test");
    });

});
