class ReturnResult {
  constructor(fs = require('fs'), es = require('event-stream'), textFile = 'results.txt') {
    this.fs = fs
    this.es = es
    this.textFile = textFile
  }

  readResults() {
    this.fs.createReadStream(this.textFile)
        .pipe(this.es.split())
        .pipe(this.es.mapSync(function(line) {
            //pause the readstream
            s.pause();
            this.formatLine(line);
            s.resume();
        }.bind(this))
        .on('error', function(err) {
            console.log('Error:', err);
        })
        .on('end', function() {
            console.log('Complete.');
        })
    );
  }

  formatLine(line) {
    console.log(line)
  }
}

module.exports = ReturnResult
