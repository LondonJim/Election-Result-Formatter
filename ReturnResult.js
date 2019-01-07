class ReturnResult {
  constructor(textFile = 'results.txt', fs = require('fs'), es = require('event-stream')) {
    this.textFile = textFile
    this.fs = fs
    this.es = es
    this.results = {}
    this.errors = []
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
          this.displayResults()
          console.log(`Complete with ${this.errors.length} error(s)`)
        })
    )
  }

  formatLine(line) {
    let lineResult = line.split(", ")
    let totalVotes = 0
    let partyResults = {}

    // convert party votes to integers and create a total number of votes
    for (let i = 1; i < lineResult.length; i = i + 2) {
      lineResult[i] = parseInt(lineResult[i], 10)
      totalVotes += lineResult[i]
    }

    if (isNaN(totalVotes)) {
      this.errors.push([lineResult[0], "Vote count not entered correctly"])
      return
    }

    lineResult.forEach((el, index) => {
      if (lineResult[0] === '') { return } // Empty line in text file not added
      index % 2 === 1 ? partyResults[this.partyFormat(lineResult[index + 1])] = Math.round((el * 100 / totalVotes) * 10) / 10 : null
      this.results[lineResult[0]] = partyResults
    })
  }

  partyFormat(partySymbol) {
    return this.parties[partySymbol]
  }

  displayResults() {
    for (const [key, value] of Object.entries(this.results)) {
      const partyAndPercent = value
      console.log(key,'\n' + '-'.repeat(key.length))
      for (const [key, value] of Object.entries(partyAndPercent)) {
        console.log(key, value + "%")
      }
      console.log('')
    }
  }

}

module.exports = ReturnResult
