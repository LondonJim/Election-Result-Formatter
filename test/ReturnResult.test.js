const assert = require('assert');
const ReturnResult = require('../ReturnResult')

describe('ReturnResult', function() {
  it('should instantiate with three objects', function() {
    const returnResult = new ReturnResult("fs", "es", "textFile")
    assert.equal(returnResult.fs, "fs")
    assert.equal(returnResult.es, "es")
    assert.equal(returnResult.textFile, "textFile")
  })

  describe('#readResults', function() {
    const returnResult = new ReturnResult()
  })
})
