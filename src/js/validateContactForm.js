(function () {
  var form = document.querySelector('form')

  var nameField = form.querySelector('#name')
  var emailField = form.querySelector('#email')
  var messageField = form.querySelector('#message')
  
  var nameFieldError = form.querySelector('#name-error')
  var emailFieldError = form.querySelector('#email-error')
  var messageFieldError = form.querySelector('#message-error')
  
  function validate(field, fieldError, event) {
    if (!field.value.trim()) {
      field.setAttribute('aria-invalid', 'true')
      fieldError.style.display = 'block'
      event.preventDefault()
    } else {
      if (fieldError.style.display === 'block') {
        fieldError.style.display = 'none'
      }
      if (field.getAttribute('aria-invalid')) {
        field.removeAttribute('aria-invalid')
      }
    }
  }
  
  form.addEventListener('submit', function(event) {
    validate(nameField, nameFieldError, event)
    validate(emailField, emailFieldError, event)
    validate(messageField, messageFieldError, event)
  })
})()
