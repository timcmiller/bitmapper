
var expect = require('chai').expect;
var bitmap = require(__dirname + '/../lib/bitmap');
var shuffle = require(__dirname + '/../lib/transform').shuffle;
var getDarker = require(__dirname + '/../lib/transform').getDarker;
var getBrighter = require(__dirname + '/../lib/transform').getBrighter;
var order = require(__dirname + '/../lib/transform').order;
var randomize = require(__dirname + '/../lib/transform').randomize;
var inversion = require(__dirname + '/../lib/transform').inversion;

testBuffer = new Buffer([1, 2, 3, 4]);

describe('the suffle function', function() {
  it('should suffle an array', function() {
    expect(shuffle([1, 2, 3, 4,])).to.not.eql([1, 2, 3, 4,]);
  });
});

describe('the order function', function() {
  it('should order the array in numerical order', function() {
    expect(order([3, 2, 1])).to.eql([1, 2, 3]);
  });
});


describe('the inversion function', function() {
  it('should invert the numbers based on a 255 color scale', function() {
    expect(inversion(testBuffer)).to.eql(new Buffer([254, 253, 252, 251]));
  });
});

describe('the randomize function', function() {
  it('should input random number for each input', function() {
    expect(randomize(testBuffer)).to.not.eql(new Buffer([1, 2, 3, 4]));
  });
});
