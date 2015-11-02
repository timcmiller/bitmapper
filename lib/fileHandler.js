var getData = module.exports = function(buffer) {

  var bitmap = {};

  bitmap.fullBuffer = buffer;

  bitmap.colorPaletteStart = (bitmap.fullBuffer.readUInt32LE(10) - (bitmap.fullBuffer.readUInt32LE(14) + 14));
  bitmap.pixelDataStart = bitmap.fullBuffer.readUInt32LE(10);
  bitmap.header = bitmap.pixelDataStart - bitmap.colorPaletteStart;
  bitmap.fileType = bitmap.fullBuffer.toString('utf-8', 0, 2);
  console.log(bitmap.fileType);
  return bitmap;
};

