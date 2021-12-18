const {
  constructSymbolMap
} = require('../src/symbols.js')

describe('constructSymbolMap', () => {
  it('should produce correct symbol map with only one variable', () => {
    const result = constructSymbolMap([
      '@temp'
    ])

    expect(result.temp).toBe(16)
  })

  it('should produce correct symbol map with only multiple variables', () => {
    const result = constructSymbolMap([
      '@temp',
      '@i',
      '@var'
    ])

    expect(result.temp).toBe(16)
    expect(result.i).toBe(17)
    expect(result.var).toBe(18)
  })

  it('should produce correct symbol map with only one label', () => {
    const result = constructSymbolMap([
      'dummy',
      '(LOOP)',
      'dummy'
    ])

    expect(result.LOOP).toBe(1)
  })

  it('should produce correct symbol map with only multiple labels', () => {
    const result = constructSymbolMap([
      'dummy',
      '(LOOP)',
      'dummy',
      '(INC)',
      'dummy',
      'dummy',
      'dummy',
      '(YEAH)',
      'dummy'
    ])

    expect(result.LOOP).toBe(1)
    expect(result.INC).toBe(2)
    expect(result.YEAH).toBe(5)
  })

  it('should produce correct symbol map with variables and labels', () => {
    const result = constructSymbolMap([
      '@var',
      '(LOOP)',
      'dummy',
      '(INC)',
      'dummy',
      '@i',
      'dummy',
      '(YEAH)',
      '@count'
    ])

    expect(result.LOOP).toBe(1)
    expect(result.INC).toBe(2)
    expect(result.YEAH).toBe(5)

    expect(result.var).toBe(16)
    expect(result.i).toBe(17)
    expect(result.count).toBe(18)
  })
})
