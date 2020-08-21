module.exports = {
  /**
   * Returns back some attributes based on whether the
   * link is active or a parent of an active item
   *
   * @param {String} itemUrl The link in question
   * @param {String} pageUrl The page context
   * @returns {String} The attributes or empty
   */
  getLinkActiveState(itemUrl, pageUrl) {
    let response = ''

    if (itemUrl === pageUrl) {
      response = ' aria-current="page"'
    }

    if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
      response += ' data-state="active"'
    }

    return response
  },

  /**
   * Tiny helper function to get the current year.
   * Used for the copyright blurb in the footer.
   * 
   * @returns {String} The current year
   */
  getFullYear() {
    return new Date().getFullYear();
  }
}
