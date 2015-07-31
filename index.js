'use strict';

var fs = require('fs');
var ProtoBuf = require('protobufjs');
var protoTarget = require('protobufjs/cli/pbjs/targets/json');
var protoUtil = require('protobufjs/cli/pbjs/util');
var path = require("path");
var loaderUtils = require('loader-utils');

module.exports = function (source) {
	var options = loaderUtils.parseQuery(this.query) || {};
	var self = this;

	function readProto(src, options, loaded) {
		var parser = new ProtoBuf.DotProto.Parser(src),
			data = parser.parse();

		if (!loaded) {
			loaded = {};
		}

		if (Array.isArray(data.imports)) {
			data.imports.forEach(function (imp, index) {
				var i,
					fileName;

				// Skip pulled imports and legacy descriptors
				if (typeof imp !== 'string' || (protoUtil.isDescriptor(imp) && !options.legacy)) {
					return;
				}

				fileName = path.resolve(self.context + '/' + imp);
				if (fs.existsSync(fileName)) {
					if (loaded[fileName]) {
						data.imports[index] = {};
						return;
					}
					loaded[fileName] = true;
					data.imports[index] = readProto(fs.readFileSync(fileName).toString('utf8'));
					return;
				}
				throw Error('File not found: ' + imp);
			});
		}

		return data;
	}

	if (this.cacheable()) {
		this.cacheable();
	}

	var data = readProto(source, options);
	var builder = ProtoBuf.newBuilder(protoUtil.getBuilderOptions(options, 'using'));
	builder['import'](data);

	return 'module.exports = ' + protoTarget(builder, options) + ';';
};
