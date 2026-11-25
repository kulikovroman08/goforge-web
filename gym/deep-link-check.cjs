const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname,'app.js'),'utf8');
// Evaluate initialization only; render is exercised by browser smoke testing.
const end = source.indexOf('const testNames=');
assert.ok(end>0);
const init = source.slice(0,end)+'globalThis.result=state;})();';
function open(search, saved){
 const sandbox={window:{GOFORGE_GYM_CATALOG:[{id:'dedupe'},{id:'filter'}],location:{search}},URLSearchParams,localStorage:{getItem:()=>JSON.stringify(saved)}};
 vm.runInNewContext(init,sandbox);
 return JSON.parse(JSON.stringify(sandbox.result));
}
const saved={selected:'filter',tab:'quiz',progress:{dedupe:{draft:'my code'}}};
assert.equal(open('?task=dedupe&tab=code',saved).selected,'dedupe');
assert.equal(open('?task=dedupe&tab=code',saved).tab,'code');
assert.equal(open('?task=dedupe&tab=code',saved).progress.dedupe.draft,'my code');
assert.deepEqual(open('?task=missing&tab=code',saved),saved);
assert.deepEqual(open('',saved),saved);
assert.equal(open('?task=dedupe&tab=invalid',saved).tab,'learn');
console.log('Gym deep links: PASS');
