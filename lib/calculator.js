"use babel";

import CalculatorView from "./calculator-view";
import { CompositeDisposable, Disposable } from 'atom';

export default {
	
	subscriptions: null,
	
	activate(state) {
		this.subscriptions = new CompositeDisposable(
			// Add an opener for our view.
			atom.workspace.addOpener(uri => {
				if (uri === 'atom://calculator') {
					return new CalculatorView();
				}
			}),
			
			// Register command that toggles this view
			atom.commands.add('atom-workspace', {
				'calculator:toggle': () => this.toggle()
			}),
			
			// Destroy any ActiveEditorInfoViews when the package is deactivated.
			new Disposable(() => {
				atom.workspace.getPaneItems().forEach(item => {
					if (item instanceof CalculatorView) {
						item.destroy();
					}
				});
			})
		);
	},
	
	deactivate() {
		this.subscriptions.dispose();
	},

	toggle() {
		console.log("TOGGLE IT!!!");
		atom.workspace.toggle('atom://calculator');
	},
	
	deserializeCalculatorView(serialized) {
		return new CalculatorView();
	}
}

/*
(function() {
	var $, Calculator, CalculatorView, CompositeDisposable, View, jq, _ref;
	
	_ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, $ = _ref.$, View = _ref.View;
	
	if (!window.jqUi) {
		jq = require('../jquery-ui')($);
		window.jqUi = jq;
		$ = jq;
	}

	module.exports = Calculator = {
		calculatorView: null,
		modalPanel: null,
		subscriptions: null,
		activate: function(state) {
			this.calculatorView = new CalculatorView($, state.calculatorViewState);
			this.subscriptions = new CompositeDisposable;
			return this.subscriptions.add(atom.commands.add('atom-workspace', {
				'calculator:toggle': (function(_this) {
					return function() {
						return _this.toggle();
					};
				})(this)
			}));
		},
		deactivate: function() {
			this.modalPanel.destroy();
			this.subscriptions.dispose();
			return this.calculatorView.destroy();
		},
		serialize: function() {
			return {
				calculatorViewState: this.calculatorView.serialize()
			};
		},
		toggle: function() {
			console.log('Calculator was toggled!');
			if (this.calculatorView.isVisible()) {
				return this.calculatorView.hide();
			} else {
				return this.calculatorView.show();
			}
		}
	};
}).call(this);
*/