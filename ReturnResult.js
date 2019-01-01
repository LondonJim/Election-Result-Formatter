class ReturnResult {
  constructor(fs = require('fs'), es = require('event-stream'), textFile = 'results.txt') {
    this.fs = fs
    this.es = es
    this.textFile = textFile
    this.results = []
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
          return this.results
          console.log('Complete.')
        })
    );
  }

  formatLine(line) {
    this.results.push(line)
  }
}

module.exports = ReturnResult
