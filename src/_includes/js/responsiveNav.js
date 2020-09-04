// First some JS for a our responsive nav...
//
// Since we're able to run JS, our first task is to gracefully
// upgrade our navbar. We must:
//  1) Remove nowrap from the list so our items don't simply wrap
//     when the viewport decreases.
//  2) Hide the last item of our nav list, as we always want the
//     last (& typically least important) item to be hidden by default.
//  3) Set `display: block` on our `more` menu item so that it's visible.
var navListContainer = document.querySelector('.nav__list')
navListContainer.firstElementChild.style.flexWrap = 'nowrap'

var items = navListContainer.querySelectorAll('li')
items[items.length - 1].classList.add('nav__list-item-hidden')

var moreMenuOption = document.querySelector('.nav__more-option')
moreMenuOption.style.display = 'block'

// Now, we continue on with setting up the functionality of
// the `more` menuu item (ie, opening / closing it).
var moreMenuLink = moreMenuOption.querySelector('a')
var moreMenuTarget = document.querySelector('.nav__more')
var firstMenuItem = moreMenuTarget.querySelector(
  'a[href], button:not([disabled]), input'
)

moreMenuLink.addEventListener('click', function(e) {
  e.preventDefault()

  // Toggle expanded state
  var expanded = moreMenuLink.getAttribute('aria-expanded') === 'true' || false
  moreMenuLink.setAttribute('aria-expanded', !expanded)

  // Toggle open state
  var open = moreMenuTarget.style.display === 'flex' || false
  moreMenuTarget.style.display = open ? 'none' : 'flex'

  // Move focus to the expanded menu
  if (!open) {
    firstMenuItem.focus()
  }
})

// Ensure link behaves like a <button> by activating click events on SPACE
moreMenuLink.addEventListener('keydown', function(e) {
  if (e.keyCode === 32) {
    e.preventDefault()
    moreMenuLink.click()
  }
})

// Ensure user can close more menu by pressing ESC
moreMenuTarget.addEventListener('keydown', function(e) {
  if (e.keyCode === 27) {
    e.preventDefault()
    moreMenuLink.click()
  }
})

if ('IntersectionObserver' in window) {
  var observerSettings = {
    root: navListContainer,
    threshold: 0.98,
  }

  // Find all the list items under the nav__more container
  // so we can toggle their display appropriately below in the callback.
  var moreItems = moreMenuTarget.querySelectorAll('li')

  // The callback to be passed to the Intersection Obserer.
  // It changes the visibility of both menu's items depending on
  // whether the main list items are intersecting with navListContainer.
  var callback = function(items, observer) {
    Array.prototype.forEach.call(items, function(item) {
      // We determine which nav item to display in the `more`
      // menu by checking the value of the observed item's `data-index`
      // attribute, which is its 0-index of its render order.
      // Since both list's items are rendered in the same order,
      // we can use its index to find the correct item in the `more` list.
      var index = parseInt(item.target.dataset.index)
      if (item.intersectionRatio > 0.98) {
        item.target.classList.remove('nav__list-item-hidden')
        moreItems[index].classList.add('nav__more-item-hidden')
      } else {
        item.target.classList.add('nav__list-item-hidden')
        moreItems[index].classList.remove('nav__more-item-hidden')
      }
    })
  }

  var observer = new IntersectionObserver(callback, observerSettings)
  Array.prototype.forEach.call(items, function(item) {
    observer.observe(item)
  })
} else {
  // We default the nav list's `overflow-x` to 'hidden' to help with
  // the disappearing / appearing effect. So, if the user's browser
  // does not support Intersection Observer we need to switch the value
  // to `scroll` in order for the user to still access all the nav items.
  navListContainer.style.overflowX = 'scroll'
}
