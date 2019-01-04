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

    it('should return line by line results of text file in JSON format', () => {
      assert.equal(returnResult.results, JSON.stringify({'Cardiff West': {'Conservative Party': 11014,
                                                                          'Labour Party': 17803,
                                                                          'UKIP': 4923,
                                                                          'Liberal Democrats': 2069},
                                                         'Islington South & Finsbury': {'Labour Party': 22547,
                                                                                        'Conservative Party': 9389,
                                                                                        'Liberal Democrats': 4829,
                                                                                        'UKIP': 3375,
                                                                                        'Green Party': 3371,
                                                                                        'Independent': 309},}))
    })
  })
})
