# Protocol Buffer loader module for webpack

Converts .proto files into JSON so they can be [loaded without a parser](https://github.com/dcodeIO/ProtoBuf.js/wiki/Builder#using-json-without-the-proto-parser). For use with [webpack](http://webpack.github.io/docs/) and [ProtoBuf.js](https://github.com/dcodeIO/ProtoBuf.js)

## Installation
npm install json-loader

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var protoDefinition = require('proto!./message.proto');
// => returns object converted from message.proto, resolves imports
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