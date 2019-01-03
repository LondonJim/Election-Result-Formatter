class ReturnResult {
  constructor(textFile = 'results.txt', fs = require('fs'), es = require('event-stream')) {
    this.textFile = textFile
    this.fs = fs
    this.es = es
    this.results = []
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
          console.log('Complete.')
        })
    );
  }

  formatLine(line) {
    let lineResult = line.split(", ")
    let formatResult = []
    lineResult.forEach((el, index) => {
      if (index === 0) {
        formatResult.push(el)
      } else if (index % 2 === 1) {
          formatResult.push(this.partyFormat(lineResult[index + 1]))
          formatResult.push(el)
      }
    })
    this.results.push(formatResult)
  }

  partyFormat(partySymbol) {
    return this.parties[partySymbol]
  }
}

module.exports = ReturnResult
