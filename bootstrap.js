var Bootstrapper = exports.Bootstrapper = function (hosts) {
  this.hosts = hosts;
};

Bootstrapper.prototype.bootstrap = function (node, peermanager) {
  this.node = node;
  this.peermanager = peermanager;

  var self = this;

  this.hosts.forEach(function (host) {
    if ('string' == typeof host) {
      peermanager.addPeer(host, 8334);
      return;
    }
    var addr = host.toString(16);
    if (addr.length < 8) addr = '0' + addr;
    var pieces = addr.match(/.{2}/g);
    for (i=0; i<4; i++) {
      pieces[i] = parseInt(pieces[i], 16);
    }
    pieces.reverse();
    peermanager.addPeer(pieces.join('.'), 8334);
  });
};
