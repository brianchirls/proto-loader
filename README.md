# Protocol Buffer loader module for webpack

Converts .proto files into JSON so they can be [loaded without a parser](https://github.com/dcodeIO/ProtoBuf.js/wiki/Builder#using-json-without-the-proto-parser). For use with [webpack](http://webpack.github.io/docs/) and [ProtoBuf.js](https://github.com/dcodeIO/ProtoBuf.js)

## Installation
npm install proto-loader

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
/*
protobufjs has a light build that does not include code for parsing .proto
files. The extra code is not typically necessary if you're using this loader,
but if you still need it, you can change the below line to:
var ProtoBuf = require('protobufjs');
*/
var ProtoBuf = require('protobufjs/dist/protobuf-light');

var protoDefinition = require('proto!./message.proto');
// => returns object converted from message.proto, resolves imports

var builder = ProtoBuf.loadJson(protoDefinition);
//...
```

### webpack config

``` javascript
module.exports = {
  module: {
    loaders: [
      {
        test: /\.proto$/,
        loader: "proto-loader"
      }
    ]
  }
};
```

Then you only need to write: `require("./message.proto")`


## License
MIT (http://www.opensource.org/licenses/mit-license.php)
