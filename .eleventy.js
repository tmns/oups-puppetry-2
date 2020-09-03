const dateFilter = require('./src/filters/date-filter.js')
const w3DateFilter = require('./src/filters/w3-date-filter.js')
const htmlMinTransform = require('./src/transforms/html-min-transform')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = (config) => {
  // Minify html, inline css, & inline js if we are in prod
  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform)
  }

  // Returns a list of people ordered by filename
  config.addCollection('people', (collection) =>
    collection
      .getFilteredByGlob('./src/people/*.md')
      .sort((a, b) => (Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1))
  )

  // Returns a list of shows ordered by filename
  config.addCollection('shows', (collection) =>
    collection
      .getFilteredByGlob('./src/shows/*.md')
      .sort((a, b) => (Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1))
  )

  // Returns a list of workshops ordered by filename
  config.addCollection('workshops', (collection) =>
    collection
      .getFilteredByGlob('./src/workshops/*.md')
      .sort((a, b) => (Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1))
  )

  // Returns a list of seminars ordered by filename
  config.addCollection('seminars', (collection) =>
    collection
      .getFilteredByGlob('./src/seminars/*.md')
      .sort((a, b) => (Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1))
  )

  // Returns a list of tour dates ordered by filename
  config.addCollection('tourDates', (collection) =>
    collection
      .getFilteredByGlob('./src/tour-dates/*.md')
      .sort((a, b) => (Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1))
  )

  // Returns all placeholders
  config.addCollection('placeholders', (collection) =>
    collection.getFilteredByGlob('./src/placeholders/*.md')
  )

  // Add filters
  config.addFilter('dateFilter', dateFilter)
  config.addFilter('w3DateFilter', w3DateFilter)

  // Filter that helps debugging potentially circular objects
  config.addFilter('dump', (obj) => {
    const getCircularReplacer = () => {
      const seen = new WeakSet()
      return (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return
          }
          seen.add(value)
        }
        return value
      }
    }

    return JSON.stringify(obj, getCircularReplacer(), 4)
  })

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false)

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
  }
}
