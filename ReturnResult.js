class ReturnResult {
  constructor(textFile = 'results.txt', fs = require('fs'), es = require('event-stream')) {
    this.textFile = textFile
    this.fs = fs
    this.es = es
    this.results = {}
    this.parties = { 'C': "Conservative Party",
                     "L": "Labour Party",
                     "LD": "Liberal Democrats",
                     "G": "Green Party",
                     "UKIP": "UKIP",
                     "Ind": "Independent",
                     "SNP": "SNP"}
  }

  readResults() {
    let s = this.fs.createReadStream(this.textFile)
        .pipe(this.es.split())
        .pipe(this.es.mapSync((line) => {
            s.pause()
            this.formatLine(line)
            s.resume()
        })
        .on('error', (err) => {
          console.log('Error:', err)
        })
        .on('end', () => {
          this.results = JSON.stringify(this.results)
          console.log('Complete.')
        })
    );
  }

  formatLine(line) {
    let lineResult = line.split(", ")
    let partyResults = {}
    lineResult.forEach((el, index) => {
      if (lineResult[0] === '') { return } // Empty line in text file not added
      index % 2 === 1 ? partyResults[this.partyFormat(lineResult[index + 1])] = parseInt(el, 10) : null
      this.results[lineResult[0]] = partyResults
    })
  }

  partyFormat(partySymbol) {
    return this.parties[partySymbol]
  }
}

module.exports = ReturnResult
