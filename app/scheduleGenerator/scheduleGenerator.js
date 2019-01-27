const fork = require('child_process').fork;

console.log("test1");

forked = fork('makeCombos.js');

forked.send([{hello: 'world'}, {hello: 'again world'}]);

console.log("test2");