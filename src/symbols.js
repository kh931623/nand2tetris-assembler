const R = require('ramda')

const getPredefinedSymbols = R.always({
  R0: 0,
  R1: 1,
  R2: 2,
  R3: 3,
  R4: 4,
  R5: 5,
  R6: 6,
  R7: 7,
  R8: 8,
  R9: 9,
  R10: 10,
  R11: 11,
  R12: 12,
  R13: 13,
  R14: 14,
  R15: 15,
  SCREEN: 16384,
  KBD: 24576,
  SP: 0,
  LCL: 1,
  ARG: 2,
  THIS: 3,
  THAT: 4
})

const startWithLeftparentheses = R.startsWith('(')
const startWithAt = R.startsWith('@')

const isSecondPartSymbol = R.pipe(
  R.slice(1, Infinity),
  parseInt,
  isNaN
)

const isAtSymbol = R.both(startWithAt, isSecondPartSymbol)

const lineNumberLens = R.lensProp('lineNumber')
const nextMemoryAddressLens = R.lensProp('nextMemoryAddress')
const symbolMapLens = R.lensProp('symbolMap')

const increaseLineNumber = R.over(lineNumberLens, R.inc)
const increaseNextMemoryAddress = R.over(nextMemoryAddressLens, R.inc)

const getNextMemoryAddress = R.view(nextMemoryAddressLens)
const getLineNumber = R.view(lineNumberLens)
const getSymbolMap = R.view(symbolMapLens)
const getAtSymbol = R.slice(1, Infinity)
const getProgramCounterSymbol = R.slice(1, -1)

const addToSymbolMap = R.curry((symbol, value, acc) => {
  return R.over(symbolMapLens, R.assoc(symbol, value), acc)
})

const alreadyHasThisSymbol = R.curry((symbol, acc) => {
  return R.pipe(
    getSymbolMap,
    R.has(symbol)
  )(acc)
})

const addMemoryAddressToSymbolMap = R.curry((code, acc) => {
  const symbol = getAtSymbol(code)

  if (alreadyHasThisSymbol(symbol, acc)) {
    return acc
  }

  const nextMemoryAddress = getNextMemoryAddress(acc)

  return R.pipe(
    addToSymbolMap(symbol, nextMemoryAddress),
    increaseNextMemoryAddress
  )(acc)
})

const addLineNumberToSymbolMap = R.curry((code, acc) => {
  const symbol = getProgramCounterSymbol(code)
  const lineNumber = getLineNumber(acc)

  return addToSymbolMap(symbol, lineNumber, acc)
})

const populateSymbolMap = (acc, code) => {
  if (startWithLeftparentheses(code)) {
    return addLineNumberToSymbolMap(code, acc)
  }

  if (isAtSymbol(code)) {
    return R.pipe(
      addMemoryAddressToSymbolMap(code),
      increaseLineNumber
    )(acc)
  }

  return increaseLineNumber(acc)
}

const getInitial = R.always({
  symbolMap: getPredefinedSymbols(),
  lineNumber: 0,
  nextMemoryAddress: 16
})

const constructSymbolMap = R.pipe(
  R.reduce(populateSymbolMap, getInitial()),
  R.prop('symbolMap')
)

module.exports = {
  constructSymbolMap
}
