var expect = require('chai.');
var fs = require('fs');

describe('an async test', function() {
  it('should timeout', function(done) {

  });

  it('should test async', function(done) {

    fs.readFile(__dirname + 'doesnotexist', function(err, data) {
      expect(err).to.eql(null);
      expect(data.toString()).to.eql('test');
      done();
    });

  });
});
