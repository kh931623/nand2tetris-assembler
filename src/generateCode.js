const R = require('ramda')

const generateA = (code) => {
  const {
    address
  } = code

  return address
    .toString(2)
    .padStart(16, '0')
}

const generateC = () => 'binary ... C'

const generateCode = R.ifElse(
  R.propEq('type', 'A'),
  generateA,
  generateC
)

module.exports = generateCode
