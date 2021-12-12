const parse = require('../src/parse.js')

describe('parse', () => {
  it('should parse A instruction correctly', () => {
    const result = parse('@10')

    const expected = {
      type: 'A',
      address: '10'
    }

    expect(result).toStrictEqual(expected)
  })
})
