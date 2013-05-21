function switchEndian(hex) {
  if (hex.length % 2 !== 0) hex = '0' + hex;
  var pieces = hex.match(/(.{2})/g);
  pieces.reverse();
  return pieces.join('');
}

for (var i = 2; i < process.argv.length; i++) {
  var val = process.argv[i];
  console.log(val +' => '+switchEndian(val));
};
