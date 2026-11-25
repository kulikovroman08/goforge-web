(function(root){
'use strict';
const guides=root.GOFORGE_GUIDES||{};
function trace(input,step){
 const done=input.slice(0,step),seen=[...new Set(done)];
 return {seen,current:input[step],duplicate:step<input.length&&seen.includes(input[step])};
}
function compilerHint(output){
 const rules=[[/undefined:/,'Переменная или функция не объявлена в этой области видимости. Проверь имя и место объявления.'],[/declared and not used|imported and not used/,'Go требует использовать объявленные локальные переменные и импорты. Проверь, не пропущена ли часть алгоритма.'],[/missing return/,'Функция должна возвращать результат на каждом пути выполнения.'],[/cannot use|mismatched types/,'Тип значения не подходит. Сравни типы параметров, ключей map и элементов среза.'],[/assignment to entry in nil map/,'Перед записью в map создай её с помощью make или литерала.'],[/index out of range/,'Индекс находится за пределами длины среза. Проверь len и границы цикла.'],[/syntax error/,'Проверь скобки, запятые и расположение инструкций около указанной строки.']];
 return rules.find(([re])=>re.test(output))?.[1]||'Сравни фактический и ожидаемый результат теста. Проверь условия задачи и граничные случаи.';
}
function mount(host,task,apply){
 const g=guides[task.id];if(!g)return;
 let stage=0,step=0,order=[],answers=[],hint=0;
 const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e};
 function btn(text,fn,parent=host){const b=el('button',text);b.type='button';b.onclick=fn;parent.append(b);return b}
 function draft(code){if(apply(code)){stage=4;render();document.getElementById('editor')?.scrollIntoView({block:'center'});}}
 function render(){
  host.replaceChildren();
  host.append(el('h2','Научи меня решать'),el('p','От понимания условия до самостоятельного кода. Можно пропустить любой этап.','muted'));
  const nav=el('div',undefined,'toolbar');host.append(nav);
  ['Алгоритм','Мысль → Go','Собери план','Пропуски','Практика'].forEach((name,i)=>{const b=btn(name,()=>{stage=i;render()},nav);if(stage===i)b.classList.add('active')});
  if(stage===0){
   if(g.frames){
    const [title,cells,state,why]=g.frames[step];
    host.append(el('h3','Шаг '+(step+1)+' из '+g.frames.length+' · '+title));
    const row=el('div',undefined,'guide-cells');cells.forEach(v=>row.append(el('span',v)));host.append(row,el('pre',state),el('p',why,'feedback'));
    const controls=el('div',undefined,'toolbar');host.append(controls);btn('Назад',()=>{step--;render()},controls).disabled=step===0;btn('Далее',()=>{step++;render()},controls).disabled=step===g.frames.length-1;
   }else{
   const t=trace(g.example,step);
   host.append(el('h3','Шаг '+step+' из '+g.example.length));
   const cells=el('div',undefined,'guide-cells');g.example.forEach((id,i)=>{const c=el('span',id,i===step?'guide-current':i<step?'guide-done':'');cells.append(c)});host.append(cells);
   host.append(el('p','seen: '+(t.seen.join(', ')||'пусто')),el('p','result: ['+t.seen.join(', ')+']'),el('p',step===g.example.length?'Готово: порядок сохранён.':t.duplicate?'ID '+t.current+' уже был — пропускаем.':'ID '+t.current+' новый — запоминаем и добавляем.','feedback'));
   const row=el('div',undefined,'toolbar');host.append(row);btn('Назад',()=>{step--;render()},row).disabled=step===0;btn('Далее',()=>{step++;render()},row).disabled=step===g.example.length;
   }
  }else if(stage===1){
   g.steps.forEach(([thought,code,why],i)=>{const d=el('details');d.append(el('summary',(i+1)+'. '+thought),el('pre',code),el('p',why));host.append(d)});
   if(task.id==='dedupe')host.append(el('p','В учебном варианте используем bool; в production можно хранить только присутствие ключа через struct{}.','muted'));
  }else if(stage===2){
   host.append(el('p','Нажимай действия в правильном порядке.'));
   order.forEach((i,n)=>host.append(el('p',(n+1)+'. '+g.blocks[i])));
   g.blocks.forEach((name,i)=>{if(!order.includes(i))btn(name,()=>{order.push(i);render()}).classList.add('choice')});
   if(order.length===g.blocks.length)host.append(el('p',order.every((x,i)=>x===g.order[i])?'Верно!':'Сравни порядок с пошаговым объяснением алгоритма.','feedback'));
   btn('Сбросить порядок',()=>{order=[];render()});
  }else if(stage===3){
   g.blanks.forEach((x,i)=>{const box=el('div',undefined,'question');box.append(el('pre',x.before+'___'+x.after));x.options.forEach((v,j)=>btn(v,()=>{answers[i]=j;render()},box).classList.add('choice'));if(answers[i]!==undefined)box.append(el('p',(answers[i]===x.correct?'Верно. ':'Попробуй ещё. ')+x.explain,'feedback'));host.append(box)});
  }else{
   host.append(el('p','Выбери объём помощи. Каждый вариант открывается в том же редакторе и проверяется настоящими тестами.'));
   btn('Допиши часть функции',()=>draft(g.partial)).classList.add('choice');
   btn('Исправь баг в коде',()=>draft(g.bug)).classList.add('choice');
   btn('Решай самостоятельно',()=>draft(task.starter)).classList.add('choice');
   if(g.production)host.append(el('h3','В работе'),el('p',g.production));
   if(g.interview)host.append(el('h3','На собеседовании'),el('p',g.interview));
   host.append(el('p','После решения попробуй похожие задачи:'));
   const row=el('div',undefined,'toolbar');host.append(row);
   for(const [id,title] of (g.related||[['filter','Фильтрация'],['slice-detach','Копирование']])){const a=el('a',title);const url=new URL(location.href);url.searchParams.set('task',id);url.searchParams.set('tab','code');a.href=url.href;row.append(a)}
  }
  const h=el('details');h.append(el('summary','Не знаю, с чего начать · '+hint+'/'+g.hints.length));h.open=hint>0;
  g.hints.slice(0,hint).forEach((v,i)=>h.append(el('pre',(i+1)+'. '+v)));
  btn('Следующая подсказка',()=>{hint++;render()},h).disabled=hint>=g.hints.length;host.append(h);
  if(stage<4)btn('Следующий этап →',()=>{stage++;render()}).classList.add('primary');
 }
 render();
}
const api={trace,compilerHint,mount};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.GoForgeGuided=api;
})(typeof window!=='undefined'?window:globalThis);
