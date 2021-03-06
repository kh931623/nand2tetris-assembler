const generateCode = require('../src/generateCode.js')

describe('generateCode', () => {
  it('should generate A instruction @1 correctly', () => {
    const result = generateCode({}, {
      type: 'A',
      address: '1'
    })

    expect(result).toBe('0000000000000001')
  })

  it('should generate A instruction @8 correctly', () => {
    const result = generateCode({}, {
      type: 'A',
      address: '8'
    })

    expect(result).toBe('0000000000001000')
  })

  it('should generate A instruction @temp(16) correctly', () => {
    const symbolMap = {
      temp: 16
    }

    const result = generateCode(symbolMap, {
      type: 'A',
      address: 'temp'
    })

    expect(result).toBe('0000000000010000')
  })

  it('should generate A instruction @var(20) correctly', () => {
    const symbolMap = {
      var: 20
    }

    const result = generateCode(symbolMap, {
      type: 'A',
      address: 'var'
    })

    expect(result).toBe('0000000000010100')
  })

  it('should generate A instruction @R0 correctly', () => {
    const symbolMap = {
      R0: 0
    }

    const result = generateCode(symbolMap, {
      type: 'A',
      address: 'R0'
    })

    expect(result).toBe('0000000000000000')
  })

  it('should generate C instruction D=D+A correctly', () => {
    const result = generateCode({}, {
      type: 'C',
      dest: 'D',
      comp: 'D+A'
    })

    expect(result).toBe('1110000010010000')
  })

  it('should generate C instruction D;JGT correctly', () => {
    const result = generateCode({}, {
      type: 'C',
      dest: '',
      comp: 'D',
      jump: 'JGT'
    })

    expect(result).toBe('1110001100000001')
  })

  it('should generate C instruction MD=M-1 correctly', () => {
    const result = generateCode({}, {
      type: 'C',
      dest: 'MD',
      comp: 'M-1',
      jump: ''
    })

    expect(result).toBe('1111110010011000')
  })
})
