"use babel";

var fs;
fs = require('fs');

export default class CalculatorView{
	
	
	
	constructor(serializedState) {
		// Create root element
		this.element = document.createElement("div");
		this.element.classList.add("calculator");
		
		// create calculator element and display 
		var calcdisplay = fs.readFileSync(__dirname + '/calculator.html').toString();
		const calculator = document.createElement("div");
		calculator.innerHTML = calcdisplay;
		
		// append calculator html to panel
		this.element.appendChild(calculator);
		
		// find the output display 
		//var display = this.element.find("input"); // calculator.find('input');
		//this.display = this.calculator.find("input");
		//this.display.val("");
		//this.memory = 0;
		
	}
	
	init() {
		var scope;
		this.buttons = [];
		scope = this;
		
		this.calculator.find('.calc-button').each(function() {
			console.log("HELLO WORLD");
			var el, i;
			i = parseInt(scope.$(this).text());
			if (!isNaN(i)) {
				el = scope.$(this);
				el.data('num', i);
				return scope.buttons.push(el);
			}
		});
	}
	
	// Returns an object that can be retrieved when package is activated
	serialize() {
		return {
			// This is used to look up the deserializer function. 
			// It can be any string, but it needs to be
			// unique across all packages!
			deserializer: 'calculator/CalculatorView'
		}
	}
	
	//reset() {
	//	
	//}
	
	// Tear down any state and detach
	destroy() {
		this.element.remove();
		this.subscriptions.dispose();
	}
	
	getElement() {
		return this.element;
	}
	
	// **************************************
	getTitle() {
		// Used by Atom for tab text
		return 'Calculator';
	}
	
	getURI() {
		// Used by Atom to identify the view when toggling.
		return 'atom://calculator';
	}
	
	
	getDefaultLocation() {
		// This location will be used if the user hasn't overridden it by dragging the item elsewhere.
		// Valid values are "left", "right", "bottom", and "center" (the default).
		return 'right';
	}
	
	getAllowedLocations() {
		// The locations into which the item can be moved.
		return ['left', 'right', 'bottom'];
	}
	
}


/*
(function() {
  var CalculatorView, fs, vm;

  fs = require('fs');

  vm = require('vm');

  module.exports = CalculatorView = (function() {
	function CalculatorView(_at_$, serializeState) {
	  this.$ = _at_$;
	  this.element = document.createElement('div');
	  this.element.classList.add('calculator');
	  this.element.innerHTML = fs.readFileSync(__dirname + '/calculator.html').toString();
	  this.calculator = this.$(this.element);
	  this.$(this.element).append(this.calculator);
	  this.$('body').append(this.element);
	  this.display = this.calculator.find('input');
	  this.display.val('');
	  this.memory = 0;
	  setTimeout(this.init.bind(this, 100));
	  this.calculator.draggable();
	  this.state = 'hidden';
	}

	CalculatorView.prototype.init = function() {
	  var scope;
	  this.buttons = [];
	  scope = this;
	  this.calculator.find('.calc-button').each(function() {
		var el, i;
		i = parseInt(scope.$(this).text());
		if (!isNaN(i)) {
		  el = scope.$(this);
		  el.data('num', i);
		  return scope.buttons.push(el);
		}
	  });
	  scope = this;
	  return this.calculator.find('.calc-button').click(function() {
		var el;
		el = scope.$(this);
		if (el.hasClass('execute-button')) {
		  scope.execute();
		}
		if (el.hasClass('addition-button')) {
		  scope.add('+');
		}
		if (el.hasClass('multiply-button')) {
		  scope.add('*');
		}
		if (el.hasClass('divide-button')) {
		  scope.add('/');
		}
		if (el.hasClass('clear-button')) {
		  scope.display.val('');
		}
		if (el.hasClass('mrc-button')) {
		  scope.memory = 0;
		}
		if (el.hasClass('m-add-button')) {
		  scope.memory += parseFloat(scope.display.val());
		}
		if (el.hasClass('m-button')) {
		  scope.display.val(scope.memory);
		}
		if (!isNaN(el.data('num'))) {
		  return scope.add(el.data('num').toString());
		}
	  });
	};

	CalculatorView.prototype.add = function(add) {
	  var text;
	  text = this.display.val();
	  text += add;
	  this.display.val(text);
	  return text;
	};

	CalculatorView.prototype.execute = function() {
	  var val;
	  val = 0;
	  val = vm.runInNewContext(this.display.val());
	  this.display.val(val);
	  return val;
	};

	CalculatorView.prototype.serialize = function() {
	  return {
		state: this.state
	  };
	};

	CalculatorView.prototype.destroy = function() {};

	CalculatorView.prototype.isVisible = function() {
	  return this.state !== 'hidden';
	};

	CalculatorView.prototype.hide = function() {
	  this.state = 'hidden';
	  return this.$(this.element).hide();
	};

	CalculatorView.prototype.show = function() {
	  this.state = 'visible';
	  return this.$(this.element).show();
	};

	CalculatorView.prototype.getElement = function() {
	  return this.element;
	};

	return CalculatorView;

  })();

}).call(this);
*/