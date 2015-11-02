
var expect = require('chai').expect;
var fs = require('fs');
var getData = require(__dirname + '/../lib/fileHandler.js');
var img = fs.readFileSync(__dirname + '/../img/bitmap1.bmp');
var shuffle = require(__dirname + '/../lib/transform').shuffle;
var getDarker = require(__dirname + '/../lib/transform').getDarker;
var getBrighter = require(__dirname + '/../lib/transform').getBrighter;
var order = require(__dirname + '/../lib/transform').order;
var randomize = require(__dirname + '/../lib/transform').randomize;
var inversion = require(__dirname + '/../lib/transform').inversion;

var testBuffer = new Buffer([1, 2, 3, 4]);

describe('the suffle function', function() {
  it('should suffle a buffer', function() {
    expect(shuffle(testBuffer)).to.not.eql(new Buffer([1, 2, 3, 4]));
  });

  after(function() {
    testBuffer = new Buffer([1, 2, 3, 4]);
  });
});


describe('the inversion function', function() {
  it('should invert the numbers based on a 255 color scale', function() {
    expect(inversion(testBuffer)).to.eql(new Buffer([254, 253, 252, 251]));
  });
});

describe('the get data function', function() {

  before(function() {
    var bitmap = getData(img);
  });

  it('should return the bitmap type for me', function() {
    expect(bitmap.fileType).to.eql('BM');
  });

  it('should return header length for me', function() {
    expect(bitmap.header).to.eql(54);
  });

  it('should return where the pixel data starts', function() {
    expect(bitmap.pixilDataStart).to.eql(1078);
  });

  it('should return the length of the color palette', function() {
    expect(bitmap.colorPaletteStart).to.eql(1024);
  });

});
