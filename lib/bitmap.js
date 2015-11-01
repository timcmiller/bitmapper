#!/usr/bin/env node

var fs = require('fs');
var bitmap = fs.readFileSync(__dirname + '/../img/' + process.argv[2] + '.bmp');
var getDarker = require(__dirname + '/transform.js').getDarker;
var getBrighter = require(__dirname + '/transform.js').getBrighter;
var order = require(__dirname + '/transform.js').order;
var randomize = require(__dirname + '/transform.js').randomize;
var shuffle = require(__dirname + '/transform.js').shuffle;
var inversion = require(__dirname + '/transform.js').inversion;
var greyScale = require(__dirname + '/transform.js').greyScale;


var colorPaletteData = (bitmap.readUInt32LE(10) - (bitmap.readUInt32LE(14) + 14));
var pixilDataStart = bitmap.readUInt32LE(10);
var header = pixilDataStart - colorPaletteData;

var colorPalette = new Buffer(colorPaletteData);
var pixilBuffer = new Buffer(bitmap.length - pixilDataStart);

if(colorPaletteData !== 0){
  colorPalette = bitmap.slice(header, pixilDataStart);
} else {
  colorPalette = bitmap.slice(pixilDataStart);
}
pixilBuffer = bitmap.slice(pixilDataStart);


for (var i = 3;i < process.argv.length; i++) {
  if(process.argv[i] === 'greyScale') greyScale(colorPalette);
  if(process.argv[i] === 'shuffle') shuffle(pixilBuffer);
  if(process.argv[i] === 'inversion') inversion(colorPalette);
  if(process.argv[i] === 'getDarker') getDarker(colorPalette);
  if(process.argv[i] === 'getBrighter') getBrighter(colorPalette);
  if(process.argv[i] === 'order') order(pixilBuffer);
  if(process.argv[i] === 'randomize') randomize(pixilBuffer);
}

fs.writeFile((__dirname + '/../img/bitmap2.bmp'), bitmap, 'hex', function(data, err) {
  if (err) throw err;
  console.log('It\'s saved!');
});




