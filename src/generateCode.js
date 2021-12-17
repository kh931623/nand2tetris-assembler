const R = require('ramda')

const generateA = (code) => {
  const {
    address
  } = code

  return parseInt(address)
    .toString(2)
    .padStart(16, '0')
}

const generateComp = () => 'comp'

const getDest = R.prop(R.__, {
  M: '001',
  D: '010',
  DM: '011',
  A: '100',
  AM: '101',
  AD: '110',
  ADM: '111'
})

const generateDest = R.pipe(
  R.propOr('', 'dest'),
  R.ifElse(
    R.identity,
    getDest,
    R.always('000')
  )
)

const getJump = R.prop(R.__, {
  JGP: '001',
  JEQ: '010',
  JGE: '011',
  JLT: '100',
  JNE: '101',
  JLE: '110',
  JMP: '111'
})

const generateJump = R.pipe(
  R.propOr('', 'jump'),
  R.ifElse(
    R.identity,
    getJump,
    R.always('000')
  )
)

const generateC = R.pipe(
  R.juxt([
    R.always('111'),
    generateComp,
    generateDest,
    generateJump
  ]),
  R.join('')
)

const generateCode = R.ifElse(
  R.propEq('type', 'A'),
  generateA,
  generateC
)

module.exports = generateCode
