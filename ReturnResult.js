class ReturnResult {
  constructor(fs = require('fs'), es = require('event-stream')) {
    this.fs = fs
    this.es = es

    this.readResults()
  }

  readResults() {
    let s = this.fs.createReadStream('./results.txt')
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

returnResults = new ReturnResult()
