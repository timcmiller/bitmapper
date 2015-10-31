var fs = require('fs');
var bitmap = fs.readFileSync('bitmap1.bmp');

var bitmapWidth = bitmap.readUInt32LE(18);
var bitmapHeight = bitmap.readUInt32LE(22);
var colorPaletteData = (bitmap.readUInt32LE(10) - (bitmap.readUInt32LE(14) + 14));
var pixilDataStart = bitmap.readUInt32LE(10);
var header = pixilDataStart - colorPaletteData;

var colorPalette = new Buffer(colorPaletteData);
var pixilBuffer = new Buffer(bitmap.length - pixilDataStart);
colorPalette = bitmap.slice(header, pixilDataStart);
pixilBuffer = bitmap.slice(pixilDataStart);


var getDarker = function() {

  Array.prototype.forEach.call(colorPalette, function(byte, index) {
    colorPalette.writeUInt8((byte/2), index);

  });
};


var getBrighter = function() {

    Array.prototype.forEach.call(colorPalette, function(byte, index) {
      if(byte < 123) {
      colorPalette.writeUInt8(byte * 2, index);
    }

  });
};

var order = function(buffer) {

  buffer = Array.prototype.sort.call(buffer);

};

var shuffle = function(buffer) {
  var m = buffer.length, t, i;

  while(m) {

    i = Math.floor(Math.random() * m--);

    t = buffer[m];
    buffer[m] = buffer[i];
    buffer[i] = t;
  }
  return buffer;
};

var inversion = function() {

  Array.prototype.forEach.call(colorPalette, function(byte, index) {
    colorPalette.writeUInt8(255 - byte, index);

  });
};

var randomize = function() {

  Array.prototype.forEach.call(colorPalette, function(byte, index) {
    byte = Math.floor(Math.random() *  255);
      colorPalette.writeUInt8(byte, index);
  });
};


var greyScale = function() {

//to impletment
};

randomize();
order(pixilBuffer);
fs.writeFile('bitmap8.bmp', bitmap, 'hex', function(data, err) {
  if (err) throw err;
  console.log('It\'s saved!');
});




