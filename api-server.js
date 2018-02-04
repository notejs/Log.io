var express = require('express');
var app = express();

module.exports.start = function(harvester) {

  app.get('/log', function(req, res){
    var callback = req.query.callback;
    var msg = req.query.msg;
    
    if (msg) {
      var remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      remoteAddress = remoteAddress.replace(/\D*/, '');
      harvester._send('+node', remoteAddress, 'device');
      harvester._send('+bind', 'node', remoteAddress);
      harvester._send('+log', 'device', remoteAddress, 'info', msg);
    }

    if (callback) {
      res.send(callback + '({"success": true})');
    } else {
      res.send('{"success": true}');
    }
  });
  
  app.listen(8008);
  console.log('listen on 8008');
}
