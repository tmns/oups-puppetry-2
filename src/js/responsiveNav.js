(function () {
  // First some JS for a our responsive nav...
  var moreNavBtn = document.querySelector('.main-nav-more-item__button')
  var secondaryNav = document.querySelector('.main-nav__secondary')

  // Now, we continue on with setting up the functionality of
  // the `more` menuu item (ie, opening / closing it).
  var firstMenuItem = secondaryNav.querySelector(
    'a[href], button:not([disabled]), input'
  )

  moreNavBtn.addEventListener('click', function(e) {
    e.preventDefault()

    // Toggle expanded state
    var expanded = moreNavBtn.getAttribute('aria-expanded') === 'true' || false
    moreNavBtn.setAttribute('aria-expanded', !expanded)

    // Toggle open state
    var open = Array.from(secondaryNav.classList).indexOf('js-show-secondary') !== -1
    secondaryNav.classList.toggle('js-show-secondary')

    // Move focus to the expanded menu
    if (!open) {
      firstMenuItem.focus()
    }
  })

  // Ensure link behaves like a <button> by activating click events on SPACE
  moreNavBtn.addEventListener('keydown', function(e) {
    if (e.keyCode === 32) {
      e.preventDefault()
      moreNavBtn.click()
    }
  })

  // Ensure user can close more menu by pressing ESC
  moreNavBtn.addEventListener('keydown', function(e) {
    if (e.keyCode === 27) {
      e.preventDefault()
      moreNavBtn.click()
    }
  })
})()
