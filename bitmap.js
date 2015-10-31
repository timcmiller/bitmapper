var fs = require('fs');
var bitmap = fs.readFileSync('bitmap1.bmp');

var bitmapWidth = bitmap.readUInt32LE(18);
var bitmapHeight = bitmap.readUInt32LE(22);
var colorPaletteData = (bitmap.readUInt32LE(10) - (bitmap.readUInt32LE(14) + 14));
var pixilData = bitmap.readUInt32LE(10);
var header = pixilData - colorPaletteData;

// console.log(bitmap.length);
// console.log(bitmap.toString('utf-8',0, 2));
// console.log('size: ' + bitmap.readUInt32LE(2));
// console.log('bit depth: ' + bitmap.readUInt16LE(28));
// console.log('number of colors ' + bitmap.readUInt32LE(46));
// console.log('bits per pixil is ' + bitmap.readUInt16LE(28));

var colorPalette = new Buffer(colorPaletteData);

bitmap.copy(colorPalette,0 ,header ,pixilData);

console.log(colorPalette);

var getDarker = function() {

  Array.prototype.forEach.call(colorPalette, function(byte, index) {
    colorPalette.writeUInt8((byte/2), index);
    bitmap[header + index] = colorPalette[index];

  });
};

var getBrighter = function() {

    Array.prototype.forEach.call(colorPalette, function(byte, index) {
      if(byte < 123) {
      colorPalette.writeUInt8(byte * 2, index);
      bitmap[header + index] = colorPalette[index];
    }

  });
};

var inversion = function() {

  Array.prototype.forEach.call(colorPalette, function(byte, index) {
    colorPalette.writeUInt8(255 - byte, index);
    bitmap[header + index] = colorPalette[index];

  });
};

var randomize = function() {

  Array.prototype.forEach.call(colorPalette, function(byte, index) {
    byte = Math.floor(Math.random() *  255);
      colorPalette.writeUInt8(byte, index);
      bitmap[header + index] = colorPalette[index];
  });
};


var greyScale = function() {

//to impletment
};



fs.writeFile('bitmap6.bmp', bitmap, 'hex', function(data, err) {
  if (err) throw err;
  console.log('It\'s saved!');
});



