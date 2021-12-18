const R = require('ramda')

const parse = require('./parse.js')
const generateCode = require('./generateCode.js')
const {
  constructSymbolMap
} = require('./symbols.js')

const eitherCommentOrBlank = R.either(
  R.startsWith('//'),
  R.equals('')
)

const getActualCodeLines = R.pipe(
  R.split('\n'),
  R.reject(eitherCommentOrBlank),
  R.map(R.trim)
)

const tranformCode = R.curry((symbolMap, code) => {
  return R.pipe(
    parse,
    generateCode(symbolMap)
  )(code)
})

const compile = (content) => {
  // get actual codes
  const lines = getActualCodeLines(content)

  // first pass to construct symbol Map
  const symbolMap = constructSymbolMap(lines)

  // actual compilation
  return R.pipe(
    R.reject(R.startsWith('(')),
    R.map(
      tranformCode(symbolMap)
    ),
    R.join('\n')
  )(lines)
}

module.exports = compile
