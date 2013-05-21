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
