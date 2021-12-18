const R = require('ramda')

const parseA = (code) => {
  return {
    type: 'A',
    address: code.slice(1)
  }
}

const parseFullC = R.pipe(
  R.match(/([AMD]*)=?([AMD&|!10+-]*);?(\w*)/),
  R.props([
    1,
    2,
    3
  ])
)

const parsePartialC = R.pipe(
  R.match(/([AMD&|!10+-]*);?(\w*)/),
  R.props([
    1,
    2
  ]),
  R.prepend('')
)

const innerParse = R.ifElse(
  R.includes('='),
  parseFullC,
  parsePartialC
)

const parseC = R.pipe(
  innerParse,
  R.map(R.trim),
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
