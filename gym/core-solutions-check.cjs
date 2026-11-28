'use strict';
const fs=require('fs'),os=require('os'),path=require('path'),vm=require('vm'),child=require('child_process');
const runner=require('./runner.js'),dir=__dirname,read=p=>fs.readFileSync(path.join(dir,p),'utf8');
const ctx={window:{}};for(const p of ['catalog.js','guided-content.js'])vm.runInNewContext(read(p),ctx);
const names=JSON.parse(read('app.js').match(/const testNames=([^\n]+);/)[1]);
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'goforge-solutions-'));
let failed=0;
try {
 for(const task of ctx.window.GOFORGE_GYM_CATALOG.filter(t=>t.id.startsWith('core-') || t.id.startsWith('advanced-') || t.id.startsWith('concurrency-') || ['errors','typednil','activity-methods','defer-cleanup','generic-unique'].includes(t.id))){
  const guide=ctx.window.GOFORGE_GUIDES[task.id];
  for(const [kind,draft] of [['solution',task.solution],['partial',guide.partial],['bug',guide.bug]]){
   try{
    const archive=runner.buildSource(task,draft,names[task.id],read('practice/kata.go'),read('practice/kata_test.go'));
    const delimiter='\n-- solution.go --\n',idx=archive.indexOf(delimiter);if(idx<0)throw Error('invalid archive');
    fs.writeFileSync(path.join(temp,'prog_test.go'),archive.slice(0,idx));fs.writeFileSync(path.join(temp,'solution.go'),archive.slice(idx+delimiter.length));
    const opts={cwd:temp,env:{...process.env,GO111MODULE:'off'},stdio:'pipe',timeout:90000};
    child.execFileSync('go',['test','-run','^$','.'],opts);
    let pass=true;try{child.execFileSync('go',['test',...(kind==='solution'&&task.id.startsWith('concurrency-')?['-race']:[]),'-count=1','-timeout=5s','-run','^'+names[task.id]+',opts)}catch(e){if(e.status!==1)throw e;pass=false}
    if(pass!==(kind==='solution'))throw Error('unexpected test result: '+pass);
    console.log('OK',task.id,kind);
   }catch(e){failed++;console.error('FAIL',task.id,kind,String(e.stderr||e.message).slice(0,1500))}
  }
 }
}finally{fs.rmSync(temp,{recursive:true,force:true})}
if(failed)process.exitCode=1;
,'.'],opts)}catch(e){if(e.status!==1)throw e;pass=false}
    if(pass!==(kind==='solution'))throw Error('unexpected test result: '+pass);
    console.log('OK',task.id,kind);
   }catch(e){failed++;console.error('FAIL',task.id,kind,String(e.stderr||e.message).slice(0,1500))}
  }
 }
}finally{fs.rmSync(temp,{recursive:true,force:true})}
if(failed)process.exitCode=1;
