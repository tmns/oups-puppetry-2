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
  )

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
