const glob = require('glob');

describe('Checking generated css, js files',() => {
  it('should generate css, js files', (done) => {
    const files = glob.sync('./dist/+(js|css)/+(index|search)_*.+(js|css)')
    
    if (files.length) {
      done()
    } else {
      throw new Error('no html files generated')
    }
  });
});