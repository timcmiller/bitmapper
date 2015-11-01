var getDarker = function(buffer) {

  Array.prototype.forEach.call(buffer, function(byte, index) {
    buffer.writeUInt8((byte/2), index);
    return buffer;
  });
};


var getBrighter = function(buffer) {

    Array.prototype.forEach.call(buffer, function(byte, index) {
      if(byte < 123) {
      buffer.writeUInt8(byte * 2, index);
    }

  });
    return buffer;
};

var order = function(buffer) {

  buffer = Array.prototype.sort.call(buffer);
  return buffer;
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

var inversion = function(buffer) {

  Array.prototype.forEach.call(buffer, function(byte, index) {
    buffer.writeUInt8(255 - byte, index);

  });
  return buffer;
};

var randomize = function(buffer) {

  Array.prototype.forEach.call(buffer, function(byte, index) {
    byte = Math.floor(Math.random() *  255);
      buffer.writeUInt8(byte, index);
  });
  return buffer;
};


module.exports.getDarker = getDarker;
module.exports.getBrighter = getBrighter;
module.exports.order = order;
module.exports.randomize = randomize;
module.exports.shuffle = shuffle;
module.exports.inversion = inversion;
