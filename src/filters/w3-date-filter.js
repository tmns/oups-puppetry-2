/**
 * A 'filter' function that returns a given date string
 * in ISO format so that it can be used correctly within
 * an HTML <time> element.
 * 
 * @param {String} value The date string, e.g. '2020-10-04' 
 */
module.exports = (value) => {
  const dateObject = new Date(value)

  return dateObject.toISOString()
}
