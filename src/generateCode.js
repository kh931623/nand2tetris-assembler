const R = require('ramda')

const toBinary = (num) => num.toString(2)

const padStart = R.curry((len, char, str) => str.padStart(len, char))

const generateA = R.pipe(
  R.prop('address'),
  parseInt,
  toBinary,
  padStart(16, '0')
)

const getAluInstructions = R.prop(R.__, {
  0: '101010',
  1: '111111',
  '-1': '111010',
  D: '001100',
  A: '110000',
  M: '110000',
  '!D': '001101',
  '!A': '110001',
  '!M': '110001',
  '-D': '001111',
  '-A': '110011',
  '-M': '110011',
  'D+1': '011111',
  'A+1': '110111',
  'M+1': '110111',
  'D-1': '001110',
  'A-1': '110010',
  'M-1': '110010',
  'D+A': '000010',
  'D+M': '000010',
  'D-A': '010011',
  'D-M': '010011',
  'A-D': '000111',
  'M-D': '000111',
  'D&A': '000000',
  'D&M': '000000',
  'D|A': '010101',
  'D|M': '010101'
})

const getCompA = R.ifElse(
  R.includes('M'),
  R.always('1'),
  R.always('0')
)

const getComp = R.pipe(
  R.juxt([
    getCompA,
    getAluInstructions
  ]),
  R.apply(R.concat)
)

const generateComp = R.pipe(
  R.propOr('', 'comp'),
  getComp
)

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
