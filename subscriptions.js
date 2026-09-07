const $=id=>document.getElementById(id);
const toast=$("toast");
function showToast(m){toast.textContent=m;toast.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>toast.classList.remove("show"),1800)}
let subs=JSON.parse(localStorage.getItem("psd_subscriptions")||"[]");
let currentFilter="all";

function save(){localStorage.setItem("psd_subscriptions",JSON.stringify(subs))}
function esc(v){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function daysUntil(date){const a=new Date();a.setHours(0,0,0,0);const b=new Date(date+"T00:00:00");return Math.ceil((b-a)/86400000)}
function render(){
const list=$("subscriptionList");list.innerHTML="";
const filtered=subs.filter(s=>currentFilter==="all"||currentFilter==="active"||(currentFilter==="due"&&daysUntil(s.date)>=0&&daysUntil(s.date)<=7));
filtered.forEach(s=>{
const i=subs.indexOf(s),d=daysUntil(s.date);
const status=d<0?"Past due":d<=7?"Due soon":"Active";
const c=document.createElement("div");c.className="subscription-card";
c.innerHTML=`<div class="sub-icon">▣</div><div class="sub-info"><strong>${esc(s.name)}</strong><small>${esc(s.category)} • ${esc(s.cycle)}</small></div><div class="sub-right"><strong>₹${Number(s.amount||0).toFixed(0)}</strong><small>${status}</small></div><button class="delete" data-i="${i}" type="button">×</button>`;
list.appendChild(c);
});
$("empty").style.display=filtered.length?"none":"block";
document.querySelectorAll(".delete").forEach(b=>b.onclick=()=>{subs.splice(Number(b.dataset.i),1);save();render();showToast("Subscription removed.")});
}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");currentFilter=b.dataset.filter;render()});
$("addBtn").onclick=()=>$("modal").classList.add("open");
$("closeBtn").onclick=()=>$("modal").classList.remove("open");
$("saveBtn").onclick=()=>{
const name=$("name").value.trim(),amount=$("amount").value,date=$("date").value;
if(!name||!date){showToast("Enter name and payment date.");return}
subs.push({name,amount:amount||0,date,cycle:$("cycle").value,category:$("category").value});save();render();$("modal").classList.remove("open");
$("name").value="";$("amount").value="";$("date").value="";showToast("Subscription added.");
};
render();