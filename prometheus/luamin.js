const settings = {
	RenameVariables : true,
	RenameGlobals: false,
	SolveMath: false
};
const fs = require('fs')
const luamin = require('lua-format')

module.exports.beautify = function() {
	let source = luamin.Beautify(fs.readFileSync(__dirname + '\\input.lua', 'utf8'), settings);
	fs.writeFileSync(__dirname + '\\output.lua', source);
	console.log('Finished beautifying!');
}
module.exports.minify = function(use_output, filecontent) {
	if (use_output === true) {
		let source = luamin.Minify(filecontent, settings);
		console.log('Finished minifying!');
		return source
	} else if (use_output === false) {
		let source = luamin.Minify(fs.readFileSync(__dirname + '\\input.lua', 'utf8'), settings);
		fs.writeFileSync(__dirname + '\\input.lua', source);
		console.log('Finished minifying!');
	}
}
module.exports.minifyDumped = function() {
    var oldSrc = "--[BYFRON] - Promotheus Dumper @ https://discord.gg/SXQvSGme7F\n--[[ To use this, simply run the new file made under the name of \"dumped_version.lua\" and you will get the constants! ]]\n"
	let source = luamin.Minify(fs.readFileSync(__dirname + '\\dumped_version.lua', 'utf8'), settings);
	fs.writeFileSync(__dirname + '\\dumped_version.lua', oldSrc + source);
	console.log('Finished minifying!');
}