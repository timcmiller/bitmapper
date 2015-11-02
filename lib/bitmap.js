#!/usr/bin/env node

var fs = require('fs');
var img = fs.readFileSync(__dirname + '/../img/' + process.argv[2] + '.bmp');
var getData = require(__dirname + '/fileHandler.js');
var bufferMaker = require(__dirname + '/bufferMaker.js');
var transform = require(__dirname + '/transform.js');



var bitmap = getData(img);

bufferMaker(bitmap);


for (var i = 3;i < process.argv.length; i++) {
  if(process.argv[i] === 'shuffle') transform.shuffle(bitmap.pixilBuffer);
  if(process.argv[i] === 'inversion') transform.inversion(bitmap.colorPalette);
  if(process.argv[i] === 'getDarker') transform.getDarker(bitmap.colorPalette);
  if(process.argv[i] === 'getBrighter') transform.getBrighter(bitmap.colorPalette);
  if(process.argv[i] === 'order') transform.order(bitmap.pixilBuffer);
  if(process.argv[i] === 'randomize') transformrandomize(bitmap.colorPalette);
}


fs.writeFile((__dirname + '/../img/bitmap2.bmp'), bitmap.fullBuffer, 'hex', function(data, err) {
  if (err) throw err;
  console.log('It\'s saved!');
});


