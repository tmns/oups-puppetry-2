(function () {
  // First some JS for a our responsive nav...
  var moreNavBtn = document.querySelector('.main-nav-more-item__button')
  var secondaryNav = document.querySelector('.main-nav__secondary')
  var secondaryNavLinks = secondaryNav.querySelectorAll('a')

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

    // Move focus to the expanded and toggle tabindex values
    var focused = false;
    Array.prototype.forEach.call(secondaryNavLinks, function (link) {
      if (!open && !focused && getComputedStyle(link.parentElement).display === 'flex') {
        link.focus();
        focused = true;
      }

      link.setAttribute('tabindex', open ? -1 : 0)
    })
  })

  // Ensure user can close more menu by pressing ESC
  secondaryNav.addEventListener('keydown', function(e) {
    if (e.keyCode === 27) {
      e.preventDefault()
      moreNavBtn.setAttribute('aria-expanded', false)
      secondaryNav.classList.remove('js-show-secondary')
      moreNavBtn.focus()
    }
  })
})()
