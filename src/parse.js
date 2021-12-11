const R = require('ramda')

const parseA = (code) => {
  return {
    type: 'A',
    address: code.slice(0)
  }
}

const parseC = R.pipe(
  R.match(/(\w*)=?([A-Z0-9-]*);?(\w*)/),
  R.props([
    1,
    2,
    3
  ]),
  R.zipObj([
    'dest',
    'comp',
    'jump'
  ]),
  R.assoc('type', 'C')
)

const getParser = R.cond([
  [R.startsWith('@'), R.always(parseA)],
  [R.T, R.always(parseC)]
])

const parse = (code) => {
  const parser = getParser(code)

  return parser(code)
}

module.exports = parse
