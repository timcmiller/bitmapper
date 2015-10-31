var fs = require('fs');
var bitmap = fs.readFileSync('bitmap1.bmp');

var bitmapWidth = bitmap.readUInt32LE(18);
var bitmapHeight = bitmap.readUInt32LE(22);
var colorPaletteData = (bitmap.readUInt32LE(10) - (bitmap.readUInt32LE(14) + 14));
var pixilData = bitmap.readUInt32LE(10);

// console.log('color pallette ' + (bitmap.readUInt32LE(10) - (bitmap.readUInt32LE(14) + 14)));

// console.log(bitmap.length);
// console.log(bitmap.toString('utf-8',0, 2));
// console.log('size: ' + bitmap.readUInt32LE(2));
// console.log('pixel data start: ' + bitmap.readUInt32LE(10));
// console.log('bit depth: ' + bitmap.readUInt16LE(28));
// console.log('number of colors ' + bitmap.readUInt32LE(46));
// console.log('bits per pixil is ' + bitmap.readUInt16LE(28));

var colorPalette = new Buffer(1024);

bitmap.copy(colorPalette,0 ,54 ,1078);

console.log(colorPalette[4]);
console.log(bitmap[58]);

var getDarker = function() {
  for (var i = 0; i < colorPalette.length; i++) {

    if (colorPalette[i] !== 0) {

      colorPalette[i] = (colorPalette[i].toString(16)/2);
      bitmap[54 + i] = colorPalette[i];

    }
  }
};

var getBrighter = function() {
  for (var i = 0; i < colorPalette.length; i++) {

    if (colorPalette[i] !== 0) {

      colorPalette[i] = (colorPalette[i].toString(16)*2);
      bitmap[54 + i] = colorPalette[i];

    }
  }
};
var randomize = function() {
  for (var i = 0; i < colorPalette.length; i++) {

    var ran = Math.floor((Math.random() * 1024) + 1);
    if (colorPalette[ran]) {
      i--;
    }

    if (colorPalette[i] !== 0 && colorPalette[ran] !== 0) {

      colorPalette[i] = (colorPalette[ran].toString(16));
      bitmap[54 + i] = colorPalette[i];

    }
  }
};

randomize();

fs.writeFile('bitmap4.bmp', bitmap, 'hex', function(data, err) {
  if (err) throw err;
  console.log('It\'s saved!');
});



