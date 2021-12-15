const R = require('ramda')

const parse = require('./parse.js')
const generateCode = require('./generateCode.js')

const eitherCommentOrBlank = R.either(
  R.startsWith('//'),
  R.equals('')
)

const getActualCodeLines = R.pipe(
  R.split('\n'),
  R.reject(eitherCommentOrBlank)
)

const tranformCode = R.pipe(
  R.trim,
  parse,
  generateCode
)

const compile = (content) => {
  // get actual codes
  const lines = getActualCodeLines(content)

  // first pass to construct symbol Map

  // actual compilation
  const results = R.map(tranformCode, lines)

  return results.join('\n')
}

module.exports = compile
