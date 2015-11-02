var bufferMaker = module.exports = function(bmObj) {
  bitmap.colorPalette = new Buffer(bitmap.colorPaletteStart);
  bitmap.pixilBuffer = new Buffer(bitmap.fullBuffer.length - bitmap.pixilDataStart);

  bitmap.pixilBuffer = bitmap.fullBuffer.slice(bitmap.pixilDataStart);

  if(bitmap.colorPaletteStart !== 0){
    bitmap.colorPalette = bitmap.fullBuffer.slice(bitmap.header, bitmap.pixilDataStart);
  } else {
    bitmap.colorPalette = bitmap.fullBuffer.slice(bitmap.pixilDataStart);
  }
};


