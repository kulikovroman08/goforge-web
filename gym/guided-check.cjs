const assert=require('node:assert/strict');
const {trace,compilerHint}=require('./guided.js');
assert.deepEqual(trace(['a','b','a'],0),{seen:[],current:'a',duplicate:false});
assert.deepEqual(trace(['a','b','a'],2),{seen:['a','b'],current:'a',duplicate:true});
assert.deepEqual(trace(['a','b','a'],3).seen,['a','b']);
assert.match(compilerHint('undefined: result'),/не объявлена/);
assert.match(compilerHint('missing return'),/возвращать/);
console.log('Guided coding: PASS');
