const assert = require('assert');
const ReturnResult = require('../ReturnResult')

describe('ReturnResult', () => {
  it('should instantiate with three objects', () => {
    const returnResult = new ReturnResult("fs", "es", "textFile")
    assert.equal(returnResult.fs, "fs")
    assert.equal(returnResult.es, "es")
    assert.equal(returnResult.textFile, "textFile")
  })

  describe('#readResults', () => {

    const returnResult = new ReturnResult()

    before(() => {
      returnResult.readResults()
    })

    it('should return line by line results of text file', () => {
      assert.deepEqual(returnResult.results, ['Cardiff West, 11014, C, 17803, L, 4923, UKIP, 2069, LD',
                                           'Islington South & Finsbury, 22547, L, 9389, C, 4829, LD, 3375, UKIP, 3371, G, 309, Ind',
                                           'Norbury, 6789, L, 4563, C, 204, G, 596, LD',
                                           ''])
    })
  })
})
