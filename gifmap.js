var fs = require('fs');
var bitmap = fs.readFileSync('bitmap1.bmp');

var bitmapWidth = bitmap.readUInt32LE(18);
var bitmapHeight = bitmap.readUInt32LE(22);
var colorPaletteData = (bitmap.readUInt32LE(10) - (bitmap.readUInt32LE(14) + 14));
var pixilDataStart = bitmap.readUInt32LE(10);
var header = pixilData - colorPaletteData;

var colorPalette = new Buffer(colorPaletteData);
var pixilData = new Buffer(bitmap.length - pixilDataStart);


bitmap.copy(colorPalette,0 ,header ,pixilData);
bitmap.copy(pixilData, 0, pixilDataStart);


var getDarker = function() {

  Array.prototype.forEach.call(colorPalette, function(byte, index) {
    if (index < 3) {
      byte = 255;
    } else {
      byte = 0;
    }
    colorPalette.writeUInt8((byte), index);
    bitmap[header + index] = colorPalette[index];
  });
};

var makeBlack = function() {

  Array.prototype.forEach.call(colorPalette, function(byte, index) {
    if (index < 524) {
      byte = 255;
    } else {
      byte = 0;
    }
    colorPalette.writeUInt8((byte), index);
    bitmap[header + index] = colorPalette[index];
  });

  Array.prototype.forEach.call(pixilData, function(byte, index) {
      byte = 8;
      pixilData.writeUInt8(byte, index);
      bitmap[pixilDataStart + index] = pixilData[index];
  });
};


var step1 = function() {

  for (var i = 500; i < pixilData.length; i++) {

    pixilData.writeUInt8(255, i);
    bitmap[pixilDataStart + i] = pixilData[i];
    i = i * (Math.Pi) * 2;
  }
};
// var step2 = function() {
//   for (var i = )
// }

makeBlack();

var reWriteTheFile = function() {
  fs.writeFile('bitmap8.bmp', bitmap, 'hex', function(data, err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
};

reWriteTheFile();

step1();

reWriteTheFile();



