const R = require('ramda')

const eitherCommentOrBlank = R.either(
  R.startsWith('//'),
  R.equals('')
)

const getActualCodeLines = R.pipe(
  R.split('\n'),
  R.reject(eitherCommentOrBlank)
)

const compile = (content) => {
  // get actual codes
  const lines = getActualCodeLines(content)

  // first pass

  // actual compilation

  return lines.join('\n')
}

module.exports = compile
