var bignum = require('./node_modules/bitcoinjs/node_modules/bignum');
require('./node_modules/bitcoinjs/node_modules/buffertools');

/**
 * Decode difficulty bits.
 *
 * This function calculates the difficulty target given the difficulty bits.
 */
var decodeDiffBits = function (diffBits) {
  diffBits = +diffBits;

  var size = diffBits >>> 24;
  var negative = (diffBits & 0x800000 != 0);
  var target = bignum(diffBits & 0x7fffff);
  if (size <= 3) {
    target = target.shiftRight(8*(3-size));
  } else {
    target = target.shiftLeft(8*(size-3));
  }
  if (negative === true) target = target.neg();

  // Convert to buffer
  var diffBuf = target.toBuffer();
  var targetBuf = new Buffer(32).clear();
  diffBuf.copy(targetBuf, 32-diffBuf.length);
  return targetBuf;
};

/**
 * Calculate "difficulty".
 *
 * This function calculates the maximum difficulty target divided by the given
 * difficulty target.
 */
var calcDifficulty = function (target) {
  if (!Buffer.isBuffer(target)) {
    target = decodeDiffBits(target);
  }
  var targetBigint = bignum.fromBuffer(target, {order: 'forward'});
  var maxBigint = bignum('00000000FFFF0000000000000000000000000000000000000000000000000000', 16);
  return maxBigint.div(targetBigint).toNumber();
};


var bits = new Buffer(process.argv[2], 'hex');
var target = decodeDiffBits(bits.readUInt32BE(0));
var diff = calcDifficulty(target);

console.log('Bits:       '+bits.toString('hex'));
console.log('Target:     '+target.toString('hex'));
console.log('Difficulty: '+diff);
