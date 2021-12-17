const generateCode = require('../src/generateCode.js')

describe('generateCode', () => {
  it('should generate A instruction @1 correctly', () => {
    const result = generateCode({
      type: 'A',
      address: '1'
    })

    expect(result).toBe('0000000000000001')
  })

  it('should generate A instruction @8 correctly', () => {
    const result = generateCode({
      type: 'A',
      address: '8'
    })

    expect(result).toBe('0000000000001000')
  })
})
