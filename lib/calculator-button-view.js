"use babel";

import { CompositeDisposable } from 'atom';

export default class CalculatorButtonView{
	
	constructor (options, group) {
		this.element = document.createElement('button');
		this.subscriptions = new CompositeDisposable();
		
	}
}