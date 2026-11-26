const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
const assets=JSON.parse(sw.match(/const ASSETS=(\[[^\n]+\]);/)[1]);
const scripts=[...html.matchAll(/<script src="\.\/([^"]+\.js\?v=\d+)"/g)].map(x=>'./gym/'+x[1]);
assert(scripts.length>=9);
for(const src of scripts){assert(assets.includes(src),'missing precache: '+src);assert(fs.existsSync(path.join(root,src.split('?')[0])));}
console.log('Versioned script precache: PASS');
