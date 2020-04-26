const glob = require('glob');

describe('Checking generated html files',() => {
  it('should generate html files', (done) => {
    const files = glob.sync('./dist/+(index|search).html')
    
    if (files.length) {
      done()
    } else {
      throw new Error('no html files generated')
    }
  });
});