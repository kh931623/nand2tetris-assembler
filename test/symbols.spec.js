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

  it('should produce correct symbol map with duplicaate variables', () => {
    const result = constructSymbolMap([
      '@temp',
      '@var',
      '@temp'
    ])

    expect(result.temp).toBe(16)
    expect(result.var).toBe(17)
  })

  it('should produce correct symbol map with predefined symbols', () => {
    const result = constructSymbolMap([
      '@R0',
      '@temp',
      '@var',
      '@temp',
      '@R0',
      '@KBD'
    ])

    expect(result.temp).toBe(16)
    expect(result.var).toBe(17)
    expect(result.R0).toBe(0)
    expect(result.KBD).toBe(24576)
  })
})
