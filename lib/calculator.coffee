CalculatorView = require './calculator-view'
{CompositeDisposable, $, View} = require 'atom'

# only include our modified JQ once
if not window.jqUi
  jq = require('../jquery-ui')($)
  window.jqUi = jq;
  $ = jq

module.exports = Calculator =
  calculatorView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @calculatorView = new CalculatorView($, state.calculatorViewState)
    #@modalPanel = atom.workspace.addModalPanel(item: @calculatorView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'calculator:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @calculatorView.destroy()

  serialize: ->
    calculatorViewState: @calculatorView.serialize()

  toggle: ->
    console.log 'Calculator was toggled!'
    if @calculatorView.isVisible()
      @calculatorView.hide()
    else
      @calculatorView.show()
