const assert = require('assert');
const ReturnResult = require('../ReturnResult')

describe('ReturnResult', () => {
  it('should instantiate with three objects', () => {
    const returnResult = new ReturnResult('textFile', 'fs', 'es')
    assert.equal(returnResult.fs, "fs")
    assert.equal(returnResult.es, "es")
    assert.equal(returnResult.textFile, "textFile")
  })

  describe('#readResults', () => {

    const returnResult = new ReturnResult('./test/mockResults.txt')

    before(() => {
      returnResult.readResults()
    })

    it('should return line by line results of text file in key, value array', () => {
      assert.deepEqual(returnResult.results, {'Cardiff West': {'Conservative Party': 30.8,
                                                               'Labour Party': 49.7,
                                                               'UKIP': 13.7,
                                                               'Liberal Democrats': 5.8},
                                              'Islington South & Finsbury': {'Labour Party': 51.5,
                                                                             'Conservative Party': 21.4,
                                                                             'Liberal Democrats': 11,
                                                                             'UKIP': 7.7,
                                                                             'Green Party': 7.7,
                                                                             'Independent': 0.7}})
    })

    it('should add to errors if are entered incorrectly', () => {
      assert.deepEqual(returnResult.errors, [["Norbury", "Vote count not entered correctly"],
                                             ["Croydon Central", "Vote count not entered correctly"]])
    })
  })
})
