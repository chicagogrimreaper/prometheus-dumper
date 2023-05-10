const luamin = require('./luamin.js');
const fs = require('fs');
const options = {
    "reMinifyScrpt": true, // enable if anti tamper/anti beautify
};

luamin.beautify();

const output = fs.readFileSync(__dirname + '\\output_beautified.lua', 'utf8');
var new_Output = "--[BYFRON] - Promotheus Dumper @ https://discord.gg/SXQvSGme7F\n--[[ To use this, simply run the new file made under the name of \"dumped_version.lua\" and you will get the constants! ]]\n" + output;

const matches = (output.match(
    /return (.+)\[(.+)\]/gm
))
const matches2 = (output.match(
/end, \{\}\n/gm
))
if (matches[0]) {
    try {
        // match the variable name for the arrya holding the constants
        var constant_array = matches[0].replace(/\[(.+)\]/, '');
        var constant_array = constant_array.replace('return ', '');
        // where to place the print
        new_Output = new_Output.replace(matches2[0], `end, {}\ntable.foreach(${constant_array},function(idx,key) print("[" .. tonumber(idx) .. "] --> \\"" .. tostring(key) .. "\\"") end)\n`);
        var Dumped = fs.writeFileSync(__dirname + '\\dumped_version.lua', new_Output);
        console.log(`Dumped script! Found ${matches.length} match(es) of the constant array!`);
        if (options["reMinifyScrpt"] === true) {
            console.log('Re-minifying script to its normal state!');
            luamin.minifyDumped();
        };
    } catch (err) {
        console.log(`[!] - Lua-Dumper had a error! ${err}`);
    }
}