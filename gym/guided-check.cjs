const assert=require('node:assert/strict');
const {trace,compilerHint}=require('./guided.js');
assert.deepEqual(trace(['a','b','a'],0),{seen:[],current:'a',duplicate:false});
assert.deepEqual(trace(['a','b','a'],2),{seen:['a','b'],current:'a',duplicate:true});
assert.deepEqual(trace(['a','b','a'],3).seen,['a','b']);
assert.match(compilerHint('undefined: result'),/не объявлена/);
assert.match(compilerHint('missing return'),/возвращать/);
// Exercise the actual mount() flow using a minimal DOM double.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
class Node {
 constructor(tag){this.tag=tag;this.children=[];this.textContent='';this.value='';this.classList={add(){}};}
 append(...nodes){this.children.push(...nodes);}
 replaceChildren(){this.children=[];}
 setAttribute(){}
 scrollIntoView(){}
}
const root=new Node('section');
const document={createElement:tag=>new Node(tag),getElementById:()=>null};
const context={window:{GOFORGE_GUIDES:{demo:{
 steps:[['Подготовить результат','out := make([]int, 0)','Выделяем срез'],['Вернуть','return out','Возвращаем результат']],
 frames:[['Вход',['1'],'state','why']],blocks:['Вернуть','Подготовить результат'],order:[1,0],
 blanks:[],hints:['first','second'],partial:'partial',bug:'bug',related:[]
}}},document};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'guided.js'),'utf8'),context);
let applied=[];
context.window.GoForgeGuided.mount(root,{id:'demo',role:'Условие',signature:'func demo() []int',starter:'starter'},code=>{applied.push(code);return false});
const all=(node)=>[node,...node.children.flatMap(all)];
const find=(tag,text)=>all(root).find(n=>n.tag===tag&&(text===undefined||n.textContent===text));
const click=text=>{const b=find('button',text);assert(b,'missing button '+text);b.onclick();};
const fields=()=>all(root).filter(n=>n.tag==='textarea');
assert.equal(fields().length,4);
fields()[3].value='мой план';fields()[3].oninput();
click('Не знаю первое действие — подскажи');
assert(find('p','Первое действие: Подготовить результат'));
assert(!find('pre','out := make([]int, 0)'));
click('Мысль → Go');
assert.equal(fields().length,1);
assert(!find('pre','out := make([]int, 0)'));
fields()[0].value='out := []int{}';fields()[0].oninput();
click('Сравнить с примером');
assert(find('pre','out := make([]int, 0)'));
assert.equal(fields()[0].value,'out := []int{}');
click('Скрыть пример');
assert(!find('pre','out := make([]int, 0)'));
click('Следующее действие');
assert.equal(fields()[0].value,'');
click('Предыдущее действие');
assert.equal(fields()[0].value,'out := []int{}');
click('Практика');
assert(find('p','мой план'));
click('Показать план действий без кода');
assert(find('li','Подготовить результат'));
assert(!find('pre','out := make([]int, 0)'));
click('Начать с заготовки самостоятельно');
assert.deepEqual(applied,['starter']);
click('С чего начать');
assert.equal(fields()[3].value,'мой план');
console.log('Guided coding: PASS');
