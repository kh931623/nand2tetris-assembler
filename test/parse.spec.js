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

  it('should parse A instruction with symbol correctly', () => {
    const result = parse('@temp')

    const expected = {
      type: 'A',
      address: 'temp'
    }

    expect(result).toStrictEqual(expected)
  })

  it('should parse C instruction with only dest & comp correctly', () => {
    const result = parse('M=D')

    const expected = {
      type: 'C',
      dest: 'M',
      comp: 'D',
      jump: ''
    }

    expect(result).toStrictEqual(expected)
  })

  it('should parse C instruction with only comp(0) & jump correctly', () => {
    const result = parse('0;JMP')

    const expected = {
      type: 'C',
      dest: '',
      comp: '0',
      jump: 'JMP'
    }

    expect(result).toStrictEqual(expected)
  })

  it('should parse C instruction with only comp(D) & jump correctly', () => {
    const result = parse('D;JMP')

    const expected = {
      type: 'C',
      dest: '',
      comp: 'D',
      jump: 'JMP'
    }

    expect(result).toStrictEqual(expected)
  })

  it('should parse full C instruction correctly', () => {
    const result = parse('A=D+1;JMP')

    const expected = {
      type: 'C',
      dest: 'A',
      comp: 'D+1',
      jump: 'JMP'
    }

    expect(result).toStrictEqual(expected)
  })

  it('should parse C instruction D;JGT correctly', () => {
    const result = parse('D;JGT')

    const expected = {
      type: 'C',
      dest: '',
      comp: 'D',
      jump: 'JGT'
    }

    expect(result).toStrictEqual(expected)
  })
})
