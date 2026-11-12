(()=>{
'use strict';
const catalog=window.GOFORGE_GYM_CATALOG||[];
const theory=window.GOFORGE_GYM_THEORY||[];
const extraQuestions=window.GOFORGE_GYM_QUIZ_BANK||{};
const golings=window.GOFORGE_GOLINGS_LINKS||{};
const $=id=>document.getElementById(id);
const escape=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const storageKey='goforge-gym-v2';
let state;
try {state=JSON.parse(localStorage.getItem(storageKey)||'{}')}catch{state={}}
state.selected=state.selected||catalog[0]?.id;
state.tab=state.tab||'learn';
state.progress=state.progress||{};
const testNames={"dedupe":"TestUniqueUsers","filter":"TestActive","errors":"TestWithContext","json":"TestDecodeEvent","pagination":"TestPage","retry":"TestRetry","race":"TestCounter","typednil":"TestMaybeError","map-count":"TestCountStatuses","utf8-truncate":"TestTruncateRunes","channel-merge":"TestMergeInts","http-health":"TestHealthHandler","event-pointer":"TestUpdateEventStatus","activity-methods":"TestChatActivityApplyMessage","defer-cleanup":"TestCloseWithError","worker-pool":"TestProcessJobs","http-middleware":"TestRequestIDMiddleware","select-first":"TestWaitMessage","event-validation":"TestValidateCreateEvent","slice-detach":"TestDetachedPrefix","idempotent-events":"TestEventProcessor"};
const getTheory=id=>theory.find(t=>t.id===id);
const getQuestions=task=>task.quiz.concat(extraQuestions[task.id]||[]);
const orderFor=(q,i)=>{const a=q[1].map((_,j)=>j);let seed=(i+1)*7919+q[0].length*131;for(let j=a.length-1;j>0;j--){seed=(seed*1664525+1013904223)>>>0;const k=seed%(j+1);[a[j],a[k]]=[a[k],a[j]]}return a};
const getTask=()=>catalog.find(x=>x.id===state.selected)||catalog[0];
const itemState=()=>state.progress[state.selected]??(state.progress[state.selected]={answers:{},draft:null,hint:0,runs:0,repeat:0});
const save=()=>localStorage.setItem(storageKey,JSON.stringify(state));
function render(){
const task=getTask();if(!task){$('view').textContent='Каталог пока пуст';return}
const p=itemState(),questions=getQuestions(task),topic=getTheory(task.id);
const correct=questions.filter((q,i)=>p.answers[i]===q[2]).length;
$('task-nav').innerHTML=['Go Core','Runtime','Concurrency','Backend'].map(group=>'<h3>'+escape(group)+'</h3>'+catalog.filter(t=>(getTheory(t.id)?.category||'Go Core')===group).map(t=>'<button class="taskpick '+(t.id===task.id?'active':'')+'" data-task="'+escape(t.id)+'">'+escape(getTheory(t.id)?.section||t.title)+'<small>'+escape(t.topic)+' · '+getQuestions(t).length+' вопросов · '+t.minutes+' мин</small></button>').join('')).join('')+'<details class="card" style="padding:11px"><summary>Следующие темы курса (в разработке)</summary><p class="muted tiny">Structs и методы · pointers и escape analysis · defer/panic · generics · GC/pprof · channel select · worker pool · gRPC · PostgreSQL · Kafka · Redis · System Design</p><a href="https://github.com/kulikovroman08/goforge-web/blob/main/gym/CURRICULUM.md" target="_blank" rel="noopener noreferrer">Полный учебный план</a></details>';
$('heading').innerHTML='<div class="chips"><span class="chip">'+escape(task.topic)+'</span><span class="chip">'+escape(task.level)+'</span><span class="chip">'+task.minutes+' минут</span></div><h1>'+escape(task.title)+'</h1><p class="muted">'+escape(task.role)+'</p>';
$('tabs').querySelectorAll('[data-tab]').forEach(btn=>btn.classList.toggle('active',btn.dataset.tab===state.tab));
if(state.tab==='learn'){
const sections=topic?.theory||task.theory.map((x,i)=>['Разбор '+(i+1),x]);
$('view').innerHTML='<div class="notice">Полный учебный разбор для выбранной подтемы. Сначала понятный пример, затем устройство Go, продакшен и собеседование. Текст GoForge написан заново на основе тем из открытых подборок.</div><section class="card"><h2>'+escape(topic?.section||task.title)+'</h2>'+sections.map((section,i)=>'<article class="theory-section"><h3>'+(i+1)+'. '+escape(section[0])+'</h3><p>'+escape(section[1])+'</p></article>').join('')+'<h3>Источники и дополнительные разборы</h3>'+(topic?.sources||[]).map(link=>'<p><a href="'+escape(link)+'" target="_blank" rel="noopener noreferrer">'+escape(link)+'</a></p>').join('')+'<details><summary>Образцовый ответ для собеседования</summary><p><b>'+escape(task.interview.q)+'</b></p><p>'+escape(task.interview.a)+'</p></details><div class="toolbar"><button class="primary" data-goto="quiz">Пройти '+questions.length+' тестов по теме</button></div></section>';
}else if(state.tab==='quiz'){
$('view').innerHTML='<div class="notice">Выбери ответ. После выбора сразу увидишь результат и объяснение. Можно пройти тест повторно.</div><section class="card"><h2>Проверка понимания · '+correct+'/'+questions.length+'</h2>'+questions.map((q,i)=>'<div class="question"><b>'+(i+1)+'. '+escape(q[0])+'</b>'+orderFor(q,i).map((j,pos)=>'<button class="choice '+(p.answers[i]===j?'active':'')+'" data-question="'+i+'" data-choice="'+j+'">'+escape(String.fromCharCode(65+pos))+'. '+escape(q[1][j])+'</button>').join('')+(p.answers[i]===undefined?'':'<div class="feedback"><span class="'+(p.answers[i]===q[2]?'good':'bad')+'">'+(p.answers[i]===q[2]?'✓ Правильно':'✕ Неверно')+'</span> · '+escape(q[3])+'</div>')+'</div>').join('')+'<div class="toolbar"><button id="quiz-reset">Повторить тест</button><button class="primary" data-goto="code">Перейти к написанию кода</button></div></section>';
}else if(state.tab==='code'){
$('view').innerHTML='<section class="card"><h2>Рабочая задача</h2><p>'+escape(task.role)+'</p><div class="notice">Сначала сформулируй алгоритм своими словами: какие входные данные, какой результат, что хранить, как пройти элементы и какие есть крайние случаи.</div><h3>1. План решения</h3><ol class="steps"><li>Выдели входные данные и ожидаемый выход.</li><li>Выбери структуру данных.</li><li>Напиши алгоритм из 3–5 шагов на бумаге или в голове.</li><li>Пиши Go самостоятельно, запускай тесты и исправляй ошибки.</li></ol><h3>2. Напиши код руками</h3><textarea id="editor" class="code" spellcheck="false" aria-label="Редактор Go"></textarea><div class="toolbar"><button id="hint">Подсказка '+p.hint+'/'+task.hints.length+'</button><button id="scratch">С нуля</button><button id="copy">Копировать код</button><button id="download">Скачать .go</button></div><div id="hints">'+task.hints.slice(0,p.hint).map((x,i)=>'<div class="feedback" style="margin:8px 0">Шаг '+(i+1)+': '+escape(x)+'</div>').join('')+'</div><h3>3. Проверочные случаи</h3><ul>'+task.cases.map(x=>'<li>'+escape(x)+'</li>').join('')+'</ul><div class="notice"><b>Запуск:</b> на ноутбуке используй Go и <code>go test ./...</code>; в онлайн GoForge безопасный запуск пока не подключён. Открой <a href="https://github.com/kulikovroman08/goforge-web/tree/main/gym/practice" target="_blank" rel="noopener noreferrer">файлы практики</a> и замени реализацию нужной функции в <code>gym/practice/kata.go</code>. Команда из каталога: <code>cd gym/practice && go test -run ^'+testNames[task.id]+'$ -v</code>'+(task.id==='race'?' или <code>go test -race -run ^TestCounter$</code>':'')+'. На Android открой подходящее упражнение golings по ссылке ниже. Сохранение черновика не означает, что тесты пройдены.</div><div class="toolbar" style="margin-top:12px"><button id="mark-run">Я проверил решение локально</button><a href="https://golings.madhan.app/catalog/?exercise='+encodeURIComponent(golings[task.id]?.exercise||"slices1")+'" target="_blank" rel="noopener noreferrer">▶ golings: '+escape(golings[task.id]?.label||"Упражнение по теме")+'</a></div><details><summary>Показать пример решения (только после своих попыток)</summary><pre>'+escape(task.solution)+'</pre></details></section>';
$('editor').value=p.draft===null?task.starter:p.draft;
}else{
$('view').innerHTML='<section class="card"><h2>Повторяй, пока решение не получается без подсказок</h2><p>Следующее повторение — та же задача, но без подсказок и без стартового тела функции. Не оцениваем скорость чтения: закрепляем навык самостоятельного решения.</p><p>Ранее открыто подсказок: <b>'+p.hint+'</b>. Отмечено локальных проверок: <b>'+p.runs+'</b>. Повторений с нуля: <b>'+p.repeat+'</b>.</p><button class="primary" id="repeat-code">Начать повторение с нуля</button><details><summary>Что спрашивают на собеседовании?</summary><p>'+escape(task.interview.q)+'</p><p>'+escape(task.interview.a)+'</p></details></section>';
}
save();
}
document.addEventListener('click',async e=>{
let x=e.target.closest('[data-task]');if(x){state.selected=x.dataset.task;state.tab='learn';render();return}
x=e.target.closest('[data-tab],[data-goto]');if(x){state.tab=x.dataset.tab||x.dataset.goto;render();return}
const task=getTask(),p=itemState();
x=e.target.closest('[data-question]');if(x){p.answers[Number(x.dataset.question)]=Number(x.dataset.choice);render();return}
if(e.target.closest('#quiz-reset')){p.answers={};render();return}
if(e.target.closest('#hint')){p.hint=Math.min(task.hints.length,p.hint+1);render();return}
if(e.target.closest('#scratch')){if(confirm('Очистить код и скрыть подсказки?')){p.draft='package practice\n\n// '+task.signature+'\n';p.hint=0;render()}return}
if(e.target.closest('#copy')){const text=$('editor').value;try{await navigator.clipboard.writeText(text);alert('Код скопирован')}catch{alert('Не удалось скопировать. Выдели текст вручную.')}return}
if(e.target.closest('#download')){const blob=new Blob([$('editor').value],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=task.id+'.go';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return}
if(e.target.closest('#mark-run')){p.runs++;save();alert('Отметка сохранена. GoForge не может независимо подтвердить, что тесты прошли.');render();return}
if(e.target.closest('#repeat-code')){p.repeat++;p.hint=0;p.draft='package practice\n\n// '+task.signature+'\n';state.tab='code';render();return}
if(e.target.closest('#reset-all')){if(confirm('Удалить весь локальный прогресс GoForge Gym на этом устройстве?')){localStorage.removeItem(storageKey);location.reload()}return}
});
document.addEventListener('input',e=>{if(e.target.id==='editor'){itemState().draft=e.target.value;save()}});
render();
})();