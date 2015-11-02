var getData = module.exports = function(buffer) {

  bitmap = {};

  bitmap.fullBuffer = buffer;

  bitmap.colorPaletteStart = (bitmap.fullBuffer.readUInt32LE(10) - (bitmap.fullBuffer.readUInt32LE(14) + 14));
  bitmap.pixilDataStart = bitmap.fullBuffer.readUInt32LE(10);
  bitmap.header = bitmap.pixilDataStart - bitmap.colorPaletteStart;
  bitmap.fileType = bitmap.fullBuffer.toString('utf-8', 0, 2);
  console.log(bitmap.fileType);
  return bitmap;
};

