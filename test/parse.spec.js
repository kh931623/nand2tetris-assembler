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

  it('should parse C instruction without JMP correctly', () => {
    const result = parse('M=D')

    const expected = {
      type: 'C',
      dest: 'M',
      comp: 'D',
      jump: ''
    }

    expect(result).toStrictEqual(expected)
  })

  it('should parse C instruction without dest correctly', () => {
    const result = parse('0;JMP')

    const expected = {
      type: 'C',
      dest: '',
      comp: '0',
      jump: 'JMP'
    }

    expect(result).toStrictEqual(expected)
  })
})
