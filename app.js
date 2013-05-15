var Bitcoin = require('bitcoinjs');
var cfg = require('./settings').Settings;

var PlainBlock = Bitcoin.Block;
var TxIn = Bitcoin.TransactionIn;
var TxOut = Bitcoin.TransactionOut;
var Tx = Bitcoin.Transaction;
var COINBASE_OP = Bitcoin.COINBASE_OP;

cfg.homedir = './';
node = new Bitcoin.Node(cfg);
node.version = 35000;
node.blockChain.getMinDiff = function getMinDiff() {
	return 486604799; // Minimum difficulty is same as Bitcoin's, even though Genesis Block bits differ
}
node.start();

var chain = node.getBlockChain();
chain.addListener('txSave', function(e) {
  //console.log(e);
});

/*
console.log(switchEndian('0000000000660bad0d9fbde55ba7ee14ddf766ed5f527e3fbca523ac11460b92'));
function switchEndian(hex) {
	if (hex.length % 2 !== 0) hex = '0' + hex;
	var pieces = hex.match(/(.{2})/g);
	pieces.reverse();
	return pieces.join('');
}
*/