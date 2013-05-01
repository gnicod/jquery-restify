(function($){
	var defaults = {
		//TODO reprendre tous les params  de la method $.ajax()
		root     : "",
		fields : {}, //de la forme "fields":{ "#name": { "message":"Doit etre full", "validator":"booleanFunctionName"} }
		excluded : [],
		append : [],
		//ajax part
		url      : "",
		type     : "",
		callback : function(data,json){
		}
	};

	function Restify(element,options){
		this.options = $.extend( {}, defaults, options );
		this.form = element;
		this.json  = {};
		this._defaults = defaults;
		this._name = "restify";
		this.init();		   
	}

	Restify.prototype = {
		init : function(){
			var _this = this;
			var submitEl = this.form.find('input:submit');
			if(this.options.btn!==undefined){
				submitEl = $("#"+this.options.btn);
			}
			submitEl.live('click',function(event){
				_this.form.find('.restify-msg').hide();
				_this.form.find('.restify-wrap').removeClass("restify-err");
				_this.parseForm(this.form,this.options);
				event.preventDefault();
				return false;
			});
			this.setFormDefault("root","name","root");
			this.setFormDefault("url","action","/");
			this.setFormDefault("type","method","PUT");
		},

		setFormDefault : function(option,attr,def){
			if(this.options[option]==="" && this.form.attr(attr)!=="" && this.form.attr(attr)!==undefined){
				this.options[option] = this.form.attr(attr);
			}else{
				this.options[option] = def;
			}
		},

		parseForm : function(){
			var field = {};
			var _this = this;
			$(this.form).find("input[type='text'],select,input[type='hidden'],input[type='password'],input[type='radio']:checked,textarea").each(function(){
				if($.inArray(this.name,_this.options.excluded)<0){
					field[this.name] = $(this).val();
				}
			});
			$(this.form).find("input[type='checkbox']").each(function(){
				if(this.name.substr(this.name.length - 2)==="[]"){
					var na = this.name.substr(0,this.name.length-2);
					if(field[na]===undefined){
						field[na] = [];
					}
				}
				if($.inArray(this.name,_this.options.excluded)<0){
					if(this.name.substr(this.name.length - 2)==="[]"){
						if($(this).is(":checked")){
							var na = this.name.substr(0,this.name.length-2);
							field[na].push($(this).val());
						}
					}else{
						field[this.name] = $(this).is(":checked");
					}
				}
			});
			this.json[this.options.root] = field;
			for(var field in this.options.append){
				this.json[this.options.root][field] = this.options.append[field];
			}
			this.preprocess();
		},

		preprocess : function(){
			 //TODO optimize this ****
			 if(this.options.preprocess!==undefined){
				 for(var name in this.options.preprocess){
					 var fn = this.options.preprocess[name];
					 this.json[this.options.root][name]= fn(this.json[this.options.root][name]);
				 }
			 }
			this.send(JSON.stringify(this.json));
		},

		send : function(json){
			if(!this.isValid()){return false;}
			var _this = this;
			var type = this.options.type;
			$.ajax({
				url    : _this.options.url,
				type   : _this.options.type,
				data   : json,
				dataType : "json"
			}).always(function(data) {
				_this.options.callback(data,json);
			});
		},

		isValid : function(){
			var hazError = false;
			for(var field in this.options.fields){
				var el = $(field);
				if(!this.checkLenght(el,this.options.fields[field]['min-length'],this.options.fields[field]['max-length'])){
					hazError = true;
				}
				//test custom
				if( this.options.fields[field].custom!==undefined) {
					if( this.options.fields[field].custom.fn!==undefined) {
						var fnValidator = window[this.options.fields[field].custom['fn']] || function(el){return true;};
						if(!fnValidator(el)){
							this.setErrorMessage(el,this.options.fields[field].custom.message);
							hazError = true;
						};
					}
				}
				//test regexp
				if( this.options.fields[field].regexp!==undefined) {
					if( this.options.fields[field].regexp.pattern!==undefined) {
						var re = new RegExp(this.options.fields[field].regexp.pattern);
						if(!re.test(el.val())){
							this.setErrorMessage(el,this.options.fields[field].regexp.message);
							hazError = true;
						};
					}
				}
			}
			return !hazError;
		},

		checkLenght : function(el,min,max){
			var minOk = true,
			    maxOk = true;
			if(min!==undefined){
				if(el.val().length<min){
					minOk = false;
					this.setErrorMessage(el,"min length "+min )
				}
			}
			if(max!==undefined){
				if(el.val().length>max){
					maxOk = false;
					this.setErrorMessage(el,"max length "+max )
				}
			}
			return minOk && maxOk;
		},

		setErrorMessage : function(el,msg){
			if(!el.parent().hasClass("restify-wrap")){
				el.wrapAll('<span class="restify-wrap restify-err" />');
				el.parent().append('<span class="restify-msg">'+msg+'</span>');
			}else{
				el.parent().addClass('restify-err');
				el.parent().find('.restify-msg').text(msg).show();;
			}
			el.focus();
		}
	};

	$.fn.restify = function (options) {
		var ret = null;
		this.each(function () {
			ret = new Restify($(this), options);
		});
		return ret;
	};
}(window.jQuery));
