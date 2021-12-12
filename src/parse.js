const R = require('ramda')

const parseA = (code) => {
  return {
    type: 'A',
    address: code.slice(1)
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

const parse = R.cond([
  [R.startsWith('@'), parseA],
  [R.T, parseC]
])

module.exports = parse
