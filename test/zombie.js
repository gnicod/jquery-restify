var Browser = require("zombie");
var assert = require("assert");
browser = new Browser();
browser.visit("file://"+__dirname+"/index.html", function () {

	var jquery = browser.window.jQuery;

  browser.
    //fill("field1", "field1value").
		check("bool").
    pressButton("submit", function() {
			var json = browser.window.gjson;
			obj = jquery.parseJSON(json);
			//console.log(obj);
			console.log("should return the value of an input:text filled");
      assert.equal(obj.user.field1, "field1value");

			console.log("should return true when a checkbox is checked");
      assert.ok(obj.user.bool, "bool");

			console.log("should return an array when checkboxes with the same name[] are checked");
      assert.equal(obj.user.check.length, 2);
      assert.equal(obj.user.check[0], "aa");
      assert.equal(obj.user.check[1], "bb");

			console.log("should append an object when the append option is setted");
      assert.equal(obj.user.objToAp.obj.length, 2);
    });

});
