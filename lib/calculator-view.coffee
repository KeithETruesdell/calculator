fs = require 'fs'
vm = require 'vm'

module.exports =
class CalculatorView
  constructor: (@$, serializeState) ->
    
    # Create root element
    @element = document.createElement('div')
    @element.classList.add('calculator')

    # Create calculator element
    @element.innerHTML = fs.readFileSync(__dirname + '/calculator.html').toString()
    
    @calculator = @$(@element)
    @$(@element).append @calculator
    @$('body').append @element
    
    @display = @calculator.find 'input'
    @display.val ''
    
    @memory = 0
    
    setTimeout @init.bind @, 100
    
    @calculator.draggable()
    @state = 'hidden' # say hidden even tho it isn't so package activation shows as hidden.
  
  init: ->
    @buttons = []
    scope = this
    @calculator.find('.calc-button').each ->
      i = parseInt scope.$(@).text()
      if not isNaN(i)
        el = scope.$ this
        el.data 'num', i
        scope.buttons.push el
    
    scope = this
    @calculator.find('.calc-button').click ->
      # add it to the display
      el = scope.$ this
      
      if el.hasClass('execute-button')
        scope.execute()
      if el.hasClass('addition-button')
        scope.add '+'
      if el.hasClass('multiply-button')
        scope.add '*'
      if el.hasClass('divide-button')
        scope.add '/'
      if el.hasClass('clear-button')
        scope.display.val ''
      if el.hasClass('mrc-button')
        scope.memory = 0
      if el.hasClass('m-add-button')
        scope.memory += parseFloat(scope.display.val())
      if el.hasClass('m-button')
        scope.display.val(scope.memory)
      
      if not isNaN(el.data('num'))
        scope.add el.data('num').toString()

  add: (add) ->
    text = @display.val()
    text += add
    @display.val text
    text
  
  execute: ->
    val = 0
    val = vm.runInNewContext(@display.val())
    @display.val val
    val
  
  # Returns an object that can be retrieved when package is activated
  serialize: ->
    # could possibly save screen values here too
    {
      state: @state
    }

  # Tear down any state and detach
  destroy: ->
  
  isVisible: ->
    @state != 'hidden'
  
  hide: ->
    @state = 'hidden'
    @$(@element).hide()
  
  show: ->
    @state = 'visible'
    @$(@element).show()

  getElement: ->
    @element
