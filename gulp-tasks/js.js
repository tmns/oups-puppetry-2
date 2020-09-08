var { src, dest } = require('gulp')
var uglify = require('gulp-uglify')

// An array of outputs that should be sent over to includes
const criticalJS = [
  'responsiveNav.js',
  'playCharSounds.js',
  'validateContactForm.js'
]

// Takes the arguments passed by `dest` and determines where the output file goes
const calculateOutput = ({ history }) => {
  // By default, we want a JS file in our dist directory, so the
  // HTML can grab it with a script src in the head
  let response = './dist/js'

  // Get everything after the last slash
  const sourceFileName = /[^/]*$/.exec(history[0])[0]

  // If this is critical JS though, we want it to gocriticalStyles
  // to the _includes directory, so nunjucks can include it
  // directly inline at the end of body
  if (criticalJS.includes(sourceFileName)) {
    response = './src/_includes/js'
  }

  return response
}

const js = () => {
  return src('./src/js/**/*')
    .pipe(uglify())
    .pipe(dest(calculateOutput))
}

module.exports = js