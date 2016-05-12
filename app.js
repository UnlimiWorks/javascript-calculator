// reset display handling
var reset = false
function resetDisplay () {
  if (reset) {
    reset = false
    return $('#screen').val('')
  }
}

// clicking on numbers buttons
$('.inputs').click(function () {
  resetDisplay(reset)

  if ($('#screen').val() === '0') {
    $('#screen').val(this.innerHTML)
  } else {
    $('#screen').val($('#screen').val() + this.innerHTML)
  }
})

// clicking on a dot button
$('#dot').click(function () {
  resetDisplay(reset)

  var screenValue = $('#screen').val()
  switch (screenValue[screenValue.length - 1]) {
    case undefined:
    case '+':
    case '-':
    case '*':
    case '/':
    case '%':
      $('#screen').val(screenValue + '0' + this.innerHTML)
      break
    default:
      if (screenValue.indexOf(this.innerHTML) !== -1) {
        if (screenValue.lastIndexOf(this.innerHTML) < screenValue.lastIndexOf('+') ||
          screenValue.lastIndexOf(this.innerHTML) < screenValue.lastIndexOf('-') ||
          screenValue.lastIndexOf(this.innerHTML) < screenValue.lastIndexOf('*') ||
          screenValue.lastIndexOf(this.innerHTML) < screenValue.lastIndexOf('/') ||
          screenValue.lastIndexOf(this.innerHTML) < screenValue.lastIndexOf('%')) {
          $('#screen').val(screenValue + this.innerHTML)
        }
      } else {
        $('#screen').val(screenValue + this.innerHTML)
      }
  }
})

// clicking on an operation button
$('.operations').click(function () {
  if (reset) {
    reset = !reset
  }

  var screenValue = $('#screen').val()
  switch (screenValue[screenValue.length - 1]) {
    case undefined:
      break
    case '+':
    case '-':
    case '*':
    case '/':
    case '%':
    case '.':
      $('#screen').val(screenValue.slice(0, -1) + this.innerHTML)
      break
    default:
      $('#screen').val(screenValue + this.innerHTML)
  }
})

// clicking on equals button
$('#result').click(function () {
  $('#screen').val(eval($('#screen').val()))
  reset = true
})

// Manual display reset
$('#AC').click(function () {
  $('#screen').val('')
})

$('#DEL').click(function () {
  if ($('#screen').val().length > 1) {
    $('#screen').val($('#screen').val().slice(0, -1))
  } else {
    $('#screen').val('')
  }
})
