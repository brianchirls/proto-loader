var ProtoBuf = require('protobufjs/dist/protobuf-light');

var proto = require('./test.proto');

var pbuf = ProtoBuf.loadJson(proto).build();
console.log(Object.keys(pbuf));
console.log(Object.keys(pbuf.js));
