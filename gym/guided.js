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
 let stage=-1,step=0,codeStep=0,order=[],answers=[],hint=0;
 const plan={input:'',output:'',example:'',actions:''};
 const attempts=g.steps.map(()=>''),revealed=g.steps.map(()=>false);
 let startHint=false,showPlan=false;
 const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e};
 function btn(text,fn,parent=host){const b=el('button',text);b.type='button';b.onclick=fn;parent.append(b);return b}
 function field(parent,label,value,onInput,options={}){
  const wrap=el('label',undefined,'guide-field');
  wrap.append(el('span',label));
  const input=el('textarea');input.rows=options.rows||3;input.value=value;
  input.placeholder=options.placeholder||'';
  if(options.code){input.className='guide-code-input';input.spellcheck=false;input.setAttribute('autocapitalize','off');input.setAttribute('autocomplete','off');input.setAttribute('autocorrect','off');}
  input.oninput=()=>onInput(input.value);wrap.append(input);parent.append(wrap);return input;
 }
 function draft(code){if(apply(code)){stage=4;render();document.getElementById('editor')?.scrollIntoView({block:'center'});}}
 function render(){
  host.replaceChildren();
  host.append(el('h2','Научи меня решать'),el('p','Сначала разбери условие и придумай первые действия, потом напиши код своими руками. Любой этап можно пропустить. Черновики шагов сохраняются при переключении этапов этого открытого упражнения.','muted'));
  const nav=el('div',undefined,'toolbar');host.append(nav);
  ['С чего начать','Алгоритм','Мысль → Go','Собери план','Пропуски','Практика'].forEach((name,i)=>{const index=i-1;const b=btn(name,()=>{stage=index;render()},nav);if(stage===index)b.classList.add('active')});
  if(stage===-1){
   host.append(el('h3','Разложи условие до написания кода'),el('p',task.role),el('pre',task.signature),el('p','Запиши своими словами. Не нужно знать идеальный алгоритм: начни с одного простого примера.'));
   field(host,'1. Что приходит на вход?',plan.input,v=>plan.input=v,{placeholder:'Параметры, типы, ограничения'});
   field(host,'2. Что должна вернуть функция?',plan.output,v=>plan.output=v,{placeholder:'Тип результата, пустой вход, ошибки'});
   field(host,'3. Придумай маленький пример и ожидаемый результат',plan.example,v=>plan.example=v,{placeholder:'Вход → ожидаемый выход'});
   field(host,'4. Какие действия нужны и что сделать первым?',plan.actions,v=>plan.actions=v,{placeholder:'Проверить вход, подготовить данные, пройти по ним…'});
   btn(startHint?'Скрыть направление':'Не знаю первое действие — подскажи',()=>{startHint=!startHint;render()});
   if(startHint&&g.steps[0])host.append(el('p','Первое действие: '+g.steps[0][0],'feedback'),el('p',g.steps[0][2]));
   host.append(el('p','Это твой черновой план, не автоматическая проверка. Дальше сравни его с алгоритмом.','muted'));
  }else if(stage===0){
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
   const [thought,code,why]=g.steps[codeStep];
   host.append(el('h3','Действие '+(codeStep+1)+' из '+g.steps.length+' · '+thought),
    el('p','Как записать это действие на Go? Напиши только нужный фрагмент, не всю функцию.'));
   field(host,'Твой код для этого действия',attempts[codeStep],v=>attempts[codeStep]=v,{rows:5,code:true,placeholder:'Напиши Go-код здесь…'});
   const controls=el('div',undefined,'toolbar');host.append(controls);
   btn(revealed[codeStep]?'Скрыть пример':'Сравнить с примером',()=>{revealed[codeStep]=!revealed[codeStep];render()},controls);
   if(revealed[codeStep]){
    if(!attempts[codeStep].trim())host.append(el('p','Если пока не получилось, прочитай пример, затем скрой его и попробуй записать по памяти.','feedback'));
    host.append(el('h3','Один из вариантов'),el('pre',code),el('p',why),el('p','Сравни смысл, типы и порядок действий. Другой код тоже может быть правильным; фрагменты здесь не компилируются отдельно. Полное решение проверяется Go-тестами.','muted'));
   }
   const stepsNav=el('div',undefined,'toolbar');host.append(stepsNav);
   btn('Предыдущее действие',()=>{codeStep--;render()},stepsNav).disabled=codeStep===0;
   btn('Следующее действие',()=>{codeStep++;render()},stepsNav).disabled=codeStep===g.steps.length-1;
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
   host.append(el('p','Теперь собери отдельные действия в полную функцию. Начни с заготовки без готового решения; если застрял, вернись к своему плану или выбери меньший шаг.'));
   if(plan.actions.trim())host.append(el('h3','Твой план'),el('p',plan.actions));
   btn(showPlan?'Скрыть план действий':'Показать план действий без кода',()=>{showPlan=!showPlan;render()});
   if(showPlan){const list=el('ol');g.steps.forEach(([thought])=>list.append(el('li',thought)));host.append(list);}
   host.append(el('p','После сборки запускай настоящие Go-тесты. Успех отдельных фрагментов не считается решённой задачей.','muted'));
   btn('Допиши часть функции',()=>draft(g.partial)).classList.add('choice');
   btn('Исправь баг в коде',()=>draft(g.bug)).classList.add('choice');
   btn('Начать с заготовки самостоятельно',()=>draft(task.starter)).classList.add('choice');
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
