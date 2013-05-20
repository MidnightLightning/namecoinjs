var Binary = require('binary');
var Bitcoin = require('bitcoinjs');
var Bootstrapper = require('./bootstrap.js').Bootstrapper;
var hex = Bitcoin.Util.decodeHex;

var cfg = exports.Settings = new Bitcoin.Settings();

// Override defaults
cfg.network.port = 8334;
cfg.network.magicBytes = hex('f9beb4fe');
cfg.network.bootstrap = [
  new Bootstrapper([0x58cea445, 0x2b562f4e, 0x291f20b2])
];

cfg.network.altChain = true;
cfg.network.auxPOWFlag = 1 << 8;
cfg.network.auxPOWStart = 19200;
cfg.network.auxPOWChain = 1;


/*
bool GenesisBlock(CBlock& block, int extra)
{
    block = CBlock();
    block.hashPrevBlock = 0;
    block.nVersion = 1;
    block.nTime    = 1303000001;
    block.nBits    = 0x1c007fff;
    block.nNonce   = 0xa21ea192U;
    const char* pszTimestamp = "... choose what comes next.  Lives of your own, or a return to chains. -- V";
    CTransaction txNew;
    txNew.vin.resize(1);
    txNew.vout.resize(1);
    txNew.vin[0].scriptSig = CScript() << block.nBits << CBigNum(++extra) << vector<unsigned char>((const unsigned char*)pszTimestamp, (const unsigned char*)pszTimestamp + strlen(pszTimestamp));
    txNew.vout[0].nValue = 50 * COIN;
    txNew.vout[0].scriptPubKey = CScript() << ParseHex("04b620369050cd899ffbbc4e8ee51e8c4534a855bb463439d63d235d4779685d8b6f4870a238cf365ac94fa13ef9a2a22cd99d0d5ee86dcabcafce36c7acf43ce5") << OP_CHECKSIG;
    block.vtx.push_back(txNew);
    block.hashMerkleRoot = block.BuildMerkleTree();
    printf("====================================\n");
    printf("Merkle: %s\n", block.hashMerkleRoot.GetHex().c_str());
    printf("Block: %s\n", block.GetHash().GetHex().c_str());
    block.print();
    assert(block.GetHash() == hashGenesisBlock);
    return true;
}
*/

/*
{
    "hash" : "000000000062b72c5e2ceb45fbc8587e807c155b0da735e6483dfba2f0a9c770",
    "version" : 1,
    "prev_block" : "0000000000000000000000000000000000000000000000000000000000000000",
    "mrkl_root" : "41c62dbd9068c89a449525e3cd5ac61b20ece28c3c38b3f35b2161f0e6d3cb0d",
    "time" : 1303000001,
    "bits" : 469794815,
    "nonce" : 2719916434,
    "n_tx" : 1,
    "size" : 292,
    "tx" : [
        {
            "hash" : "41c62dbd9068c89a449525e3cd5ac61b20ece28c3c38b3f35b2161f0e6d3cb0d",
            "version" : 1,
            "lock_time" : 0,
            "size" : 211,
            "in" : [
                {
                    "prev_out" : {
                        "hash" : "0000000000000000000000000000000000000000000000000000000000000000",
                        "n" : 4294967295
                    },
                    "coinbase" : "04ff7f001c020a024b2e2e2e2063686f6f7365207768617420636f6d6573206e6578742e20204c69766573206f6620796f7572206f776e2c206f7220612072657475726e20746f20636861696e732e202d2d2056"
                }
            ],
            "out" : [
                {
                    "value" : 50.00000000,
                    "scriptPubKey" : "04b620369050cd899ffbbc4e8ee51e8c4534a855bb463439d63d235d4779685d8b6f4870a238cf365ac94fa13ef9a2a22cd99d0d5ee86dcabcafce36c7acf43ce5 OP_CHECKSIG"
                }
            ]
        }
    ],
    "mrkl_tree" : [
        "41c62dbd9068c89a449525e3cd5ac61b20ece28c3c38b3f35b2161f0e6d3cb0d"
    ]
}
*/
cfg.network.genesisBlock = {
  'height': 0,
  'nonce': 0xa21ea192,
  'version': 1,
  'hash': hex('70c7a9f0a2fb3d48e635a70d5b157c807e58c8fb45eb2c5e2cb7620000000000'),
  'prev_hash': new Buffer(32).clear(),
  'timestamp': 1303000001,
  'merkle_root': hex('0dcbd3e6f061215bf3b3383c8ce2ec201bc65acde32595449ac86890bd2dc641'),
  'bits': 0x1c007fff
};
cfg.network.genesisBlockTx = {
  'outs': [{
    'v': hex('00F2052A01'), // 50 BTC
    's': Binary.put()
      .word8(65) // 65 bytes of data follow
      .put(hex('04b620369050cd899ffbbc4e8ee51e8c4534a855bb463439d63d235d4779685d8b6f4870a238cf365ac94fa13ef9a2a22cd99d0d5ee86dcabcafce36c7acf43ce5'))
      .word8(0xAC) // OP_CHECKSIG
      .buffer()
  }],
  'lock_time': 0,
  'version': 1,
  'hash': hex('a6df68c2e882cc6406a477b90e58cd01d102032a8a5e9f49c5e17d44dbef8b5e'),
  'ins': [{
    'q': hex('00F2052A01'),
    'o': hex("000000000000000000000000000000000000" +
             "0000000000000000000000000000FFFFFFFF"),
    's': Binary.put()
      .put(hex('04ff7f001c'))
      .put(hex('020a024b'))
      .put(new Buffer('... choose what comes next.  Lives of your own, or a return to chains. -- V', 'ascii'))
      .buffer()
  }]
};
cfg.network.checkpoints = [
  { height:  2016, hash: 0x0000000000660bad0d9fbde55ba7ee14ddf766ed5f527e3fbca523ac11460b92},
  { height:  4032, hash: 0x0000000000493b5696ad482deb79da835fe2385304b841beef1938655ddbc411},
  { height:  6048, hash: 0x000000000027939a2e1d8bb63f36c47da858e56d570f143e67e85068943470c9},
  { height:  8064, hash: 0x000000000003a01f708da7396e54d081701ea406ed163e519589717d8b7c95a5},
  { height: 10080, hash: 0x00000000000fed3899f818b2228b4f01b9a0a7eeee907abd172852df71c64b06},
  { height: 12096, hash: 0x0000000000006c06988ff361f124314f9f4bb45b6997d90a7ee4cedf434c670f},
  { height: 14112, hash: 0x00000000000045d95e0588c47c17d593c7b5cb4fb1e56213d1b3843c1773df2b},
  { height: 16128, hash: 0x000000000001d9964f9483f9096cf9d6c6c2886ed1e5dec95ad2aeec3ce72fa9},
  { height: 18940, hash: 0x00000000000087f7fc0c8085217503ba86f796fa4984f7e5a08b6c4c12906c05},
  { height: 30240, hash: 0xe1c8c862ff342358384d4c22fa6ea5f669f3e1cdcf34111f8017371c3c0be1da},
  { height: 57000, hash: 0xaa3ec60168a0200799e362e2b572ee01f3c3852030d07d036e0aa884ec61f203}
];
