'use strict'

var calculator = (function IIFE () {
  var $variables = {}
  var reset = false

  function resetDisplay () {
    if (reset) {
      reset = false
      $variables.output.val('')
    }
  }

  function handleInput () {
    resetDisplay()
    if ($variables.output.val() === '0') {
      $variables.output.val(this.innerHTML)
    } else {
      $variables.output.val($variables.output.val() + this.innerHTML)
    }
  }

  function handleDot () {
    resetDisplay()
    var expression = $variables.output.val()
    switch (expression[expression.length - 1]) {
      case undefined:
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
        $variables.output.val(expression + '0' + this.innerHTML)
        break
      default:
        if (expression.indexOf(this.innerHTML) === -1) {
          $variables.output.val(expression + this.innerHTML)
        } else if (expression.lastIndexOf(this.innerHTML) < expression.lastIndexOf('+') ||
          expression.lastIndexOf(this.innerHTML) < expression.lastIndexOf('-') ||
          expression.lastIndexOf(this.innerHTML) < expression.lastIndexOf('*') ||
          expression.lastIndexOf(this.innerHTML) < expression.lastIndexOf('/') ||
          expression.lastIndexOf(this.innerHTML) < expression.lastIndexOf('%')) {
          $variables.output.val(expression + this.innerHTML)
        }
    }
  }

  function handleOperation () {
    if (reset) {
      reset = !reset
    }
    var expression = $variables.output.val()
    switch (expression[expression.length - 1]) {
      case undefined:
        break
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
      case '.':
        $variables.output.val(expression.slice(0, -1) + this.innerHTML)
        break
      default:
        $variables.output.val(expression + this.innerHTML)
    }
  }

  function handleDelete () {
    resetDisplay()
    if($variables.output.val().length > 1) {
      $variables.output.val($variables.output.val().slice(0, -1))
    } else {
      $variables.output.val('')
    }
  }

  function handleReset () {
    resetDisplay()
    $variables.output.val('')
  }

  function handleResult () {
    $variables.output.val(eval($variables.output.val()))
    reset = true
  }

  function init (options) {
    $variables.output = $(options.output)
    $variables.inputButtons = $(options.inputButtons)
    $variables.dotButton = $(options.dotButton)
    $variables.operationButtons = $(options.operationButtons)
    $variables.deleteButton = $(options.deleteButton)
    $variables.resetButton = $(options.resetButton)
    $variables.resultButton = $(options.resultButton)

    $variables.inputButtons.bind('click', handleInput)
    $variables.operationButtons.bind('click', handleOperation)
    $variables.dotButton.bind('click', handleDot)
    $variables.deleteButton.bind('click', handleDelete)
    $variables.resetButton.bind('click', handleReset)
    $variables.resultButton.bind('click', handleResult)
  }

  return {
    init: init
  }
}())

$(document).ready(function () {
  calculator.init({
    output: '#screen',
    inputButtons: '.input',
    operationButtons: '.operation',
    dotButton: '#dot',
    deleteButton: '#delete',
    resetButton: '#reset',
    resultButton: '#result'
  })
})
