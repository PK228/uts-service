(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
/* reveals */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -5% 0px'});
$$('.reveal').forEach(el=>io.observe(el));
if(matchMedia('(prefers-reduced-motion: reduce)').matches)$$('.reveal').forEach(el=>el.classList.add('in'));
/* menu */
const mbtn=$('#menu-btn'),mnav=$('#mnav');
const setMenu=o=>{mnav.classList.toggle('open',o);mbtn.setAttribute('aria-expanded',o?'true':'false')};
mbtn.addEventListener('click',()=>setMenu(!mnav.classList.contains('open')));
mnav.addEventListener('click',e=>{if(e.target.tagName==='A')setMenu(false)});
addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
/* sticky call bar hides while the request block is on screen */
const sticky=$('.sticky-call'),req=$('#request');
if(sticky&&req)new IntersectionObserver(es=>sticky.classList.toggle('hide',es[0].isIntersecting),{rootMargin:'0px 0px -15% 0px'}).observe(req);
document.addEventListener('visibilitychange',()=>document.body.classList.toggle('paused',document.hidden));
/* walkthrough planner (contact page) */
const form=$('#planner');if(!form)return;
const st={building:'',doors:'',needs:[]},ticket=$('#ticket'),pmail=$('#p-mail'),pcopy=$('#p-copy');
function render(){
  const L=[];if(st.building)L.push('Building: '+st.building);if(st.doors)L.push('Doors and entrances: '+st.doors);if(st.needs.length)L.push('Needs: '+st.needs.join(', '));
  const has=L.length>0;ticket.classList.toggle('empty',!has);
  ticket.textContent=has?'WALKTHROUGH REQUEST\n'+L.join('\n'):'Tap a few options and your request writes itself here.';
  const body='Hi UTS,\n\nI would like to book a walkthrough.\n\n'+L.join('\n')+'\n\nName:\nBuilding address:\nBest time to reach me:\n';
  pmail.href='mailto:Admin@utsservice.ca?subject='+encodeURIComponent('Walkthrough request')+'&body='+encodeURIComponent(body);
  [pmail,pcopy].forEach(b=>b.setAttribute('aria-disabled',has?'false':'true'));pcopy.dataset.text=body;
}
$$('#planner .chips').forEach(g=>g.addEventListener('click',e=>{
  const b=e.target.closest('.chipb');if(!b)return;const key=g.dataset.key,v=b.textContent.trim();
  if(g.dataset.mode==='one'){const was=b.getAttribute('aria-pressed')==='true';g.querySelectorAll('.chipb').forEach(x=>x.setAttribute('aria-pressed','false'));if(!was)b.setAttribute('aria-pressed','true');st[key]=was?'':v}
  else{b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true'?'true':'false');st.needs=[...g.querySelectorAll('.chipb[aria-pressed="true"]')].map(x=>x.textContent.trim())}
  render();
}));
pcopy.addEventListener('click',async()=>{const t=pcopy.dataset.text||'';try{await navigator.clipboard.writeText(t)}catch(e){const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(_){}ta.remove()}pcopy.textContent='Copied';setTimeout(()=>{pcopy.textContent='Copy'},1800)});
render();
})();
