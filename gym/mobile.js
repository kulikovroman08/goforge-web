(()=>{
'use strict';
const tg=window.Telegram?.WebApp;
if(new URLSearchParams(location.search).get('mini')==='1'){
 document.body.classList.add('miniapp');
 if(tg?.initData){tg.ready();tg.expand();}
 const header=document.createElement('div');
 header.className='toolbar';
 const back=document.createElement('button');back.textContent='← К списку задач';
 back.onclick=()=>{document.body.classList.remove('miniapp');header.remove();};
 header.append(back);document.querySelector('main').prepend(header);
}
function setup(){
 const editor=document.getElementById('editor');
 if(!editor||document.getElementById('mobile-keys'))return;
 editor.setAttribute('autocapitalize','off');editor.setAttribute('autocomplete','off');editor.setAttribute('autocorrect','off');
 const keys=document.createElement('div');keys.id='mobile-keys';keys.className='mobile-keys';keys.setAttribute('aria-label','Клавиши Go');
 for(const key of ['Tab','{','}','[',']','(',')',':=','&','*','<','>',';']){
  const b=document.createElement('button');b.type='button';b.textContent=key;
  b.addEventListener('pointerdown',e=>e.preventDefault());
  b.onclick=()=>{const start=editor.selectionStart,end=editor.selectionEnd;editor.setRangeText(key==='Tab'?'    ':key,start,end,'end');editor.dispatchEvent(new Event('input',{bubbles:true}));editor.focus();};
  keys.append(b);
 }
 editor.after(keys);
 editor.addEventListener('keydown',e=>{if(e.key==='Tab'&&!e.shiftKey){e.preventDefault();editor.setRangeText('    ',editor.selectionStart,editor.selectionEnd,'end');editor.dispatchEvent(new Event('input',{bubbles:true}));}});
}
new MutationObserver(setup).observe(document.getElementById('view'),{childList:true});
setup();
})();