var path = require("path");
module.exports = {
	entry: './entry.js',
	target: 'node',
	externals: {
		protobufjs: 'require(\'../../node_modules/protobufjs\')'
	},
	output: {
		path: path.join(__dirname, 'out'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.proto$/,
				loader: path.join(__dirname, "..")
			}
		]
	}
};
