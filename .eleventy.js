const dateFilter = require('./src/filters/date-filter.js')
const w3DateFilter = require('./src/filters/w3-date-filter.js')

module.exports = (config) => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/')

  // Returns a list of people ordered by filename
  config.addCollection('people', (collection) =>
    collection
      .getFilteredByGlob('./src/people/*.md')
      .sort((a, b) => (Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1))
  )

  // Returns a list of shows ordered by filename
  config.addCollection('shows', (collection) =>
    collection.getFilteredByGlob('./src/shows/*.md')
      .sort((a, b) => (Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1))
  )

  // Returns a list of workshops ordered by filename
  config.addCollection('workshops', (collection) =>
    collection.getFilteredByGlob('./src/workshops/*.md')
      .sort((a, b) => (Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1))
  )

  // Returns a list of seminars ordered by filename
  config.addCollection('seminars', (collection) =>
    collection.getFilteredByGlob('./src/seminars/*.md')
      .sort((a, b) => (Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1))
  )

  config.addCollection('tourDates', (collection) =>
    collection.getFilteredByGlob('./src/tour-dates/*.md')
      .sort((a, b) => (Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1))
  )

  // Add filters
  config.addFilter('dateFilter', dateFilter)
  config.addFilter('w3DateFilter', w3DateFilter)

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

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
