var bufferMaker = module.exports = function(bmObj) {
  bmObj.colorPalette = new Buffer(bmObj.colorPaletteStart);
  bmObj.pixelBuffer = new Buffer(bmObj.fullBuffer.length - bmObj.pixelDataStart);

  bmObj.pixelBuffer = bmObj.fullBuffer.slice(bmObj.pixelDataStart);

  if(bmObj.colorPaletteStart !== 0){
    bmObj.colorPalette = bmObj.fullBuffer.slice(bmObj.header, bmObj.pixelDataStart);
  } else {
    bmObj.colorPalette = bmObj.fullBuffer.slice(bmObj.pixelDataStart);
  }
};


