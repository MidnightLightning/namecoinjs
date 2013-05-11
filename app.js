var Bitcoin = require('bitcoinjs');

cfg = new Bitcoin.Settings();
cfg.homedir = './';

// Override defaults
cfg.network.bootstrap = [
  new DnsBootstrapper([
    "bitseed.xf2.org",
    "dnsseed.bluematt.me",
    "seed.bitcoin.sipa.be",
    "dnsseed.bitcoin.dashjr.org",
  ]),
  new IrcBootstrapper('irc.lfnet.org', '#bitcoin')
];
this.network.genesisBlock = {
  'height': 0,
  'nonce': 2083236893,
  'version': 1,
  'hash': hex('6FE28C0AB6F1B372C1A6A246AE63F74F' +
              '931E8365E15A089C68D6190000000000'),
  'prev_hash': new Buffer(32).clear(),
  'timestamp': 1231006505,
  'merkle_root': hex('3BA3EDFD7A7B12B27AC72C3E67768F61' +
                     '7FC81BC3888A51323A9FB8AA4B1E5E4A'),
  'bits': 486604799
};
this.network.genesisBlockTx = {
  'outs': [{
    'v': hex('00F2052A01000000'), // 50 BTC
    's': Binary.put()
      .word8(65) // 65 bytes of data follow
      .put(hex('04678AFDB0FE5548271967F1A67130B7105CD6A828E03909' +
               'A67962E0EA1F61DEB649F6BC3F4CEF38C4F35504E51EC112' +
               'DE5C384DF7BA0B8D578A4C702B6BF11D5F'))
      .word8(0xAC) // OP_CHECKSIG
      .buffer()
  }],
  'lock_time': 0,
  'version': 1,
  'hash': hex('3BA3EDFD7A7B12B27AC72C3E67768F61' +
              '7FC81BC3888A51323A9FB8AA4B1E5E4A'),
  'ins': [{
    'q': 0xFFFFFFFF,
    'o': hex("000000000000000000000000000000000000" +
             "0000000000000000000000000000FFFFFFFF"),
    's': Binary.put()
      .put(hex('04FFFF001D010445'))
      .put(new Buffer('The Times 03/Jan/2009 Chancellor on brink of ' +
                      'second bailout for banks', 'ascii'))
      .buffer()
  }]
};

node = new Bitcoin.Node(cfg);
node.start();

var chain = node.getBlockChain();
chain.addListener('txSave', function(e) {
  //console.log(e);
});
