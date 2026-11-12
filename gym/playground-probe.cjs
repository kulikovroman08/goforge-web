// Manual end-to-end probe: execute one real GoForge task in official Go Playground.
// Run manually: node gym/playground-probe.cjs
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const runner=require('./runner.js');
const ctx={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'catalog.js'),'utf8'),ctx);
const task=ctx.window.GOFORGE_GYM_CATALOG.find(t=>t.id==='dedupe');
const source=fs.readFileSync(path.join(__dirname,'practice/kata.go'),'utf8');
const tests=fs.readFileSync(path.join(__dirname,'practice/kata_test.go'),'utf8');
(async()=>{
 for(const [name,draft,expected] of [
  ['correct solution',task.solution,true],
  ['unfinished starter',task.starter,false],
 ]){
  const archive=runner.buildSource(task,draft,'TestUniqueUsers',source,tests);
  const response=await fetch(runner.endpoint,{
   method:'POST',
   headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',Origin:'https://kulikovroman08.github.io'},
   body:new URLSearchParams({body:archive,version:'2',withVet:'true'}),
   signal:AbortSignal.timeout(25000),
  });
  const payload=await response.json();
  const result=runner.summarize(payload);
  console.log(name,'HTTP',response.status,'CORS',response.headers.get('access-control-allow-origin'),'passed',result.passed,'output',result.output.slice(0,1500));
  if(!response.ok || result.passed!==expected)throw Error('Unexpected GoForge execution result in '+name);
 }
})().catch(error=>{console.error(error);process.exitCode=1});
