const subs=JSON.parse(localStorage.getItem("psd_subscriptions")||"[]");
function daysUntil(date){const a=new Date();a.setHours(0,0,0,0);return Math.ceil((new Date(date+"T00:00:00")-a)/86400000)}
const monthly=subs.reduce((sum,s)=>sum+(s.cycle==="Yearly"?Number(s.amount||0)/12:Number(s.amount||0)),0);
const yearly=monthly*12;
document.getElementById("monthly").textContent="₹"+monthly.toFixed(0);
document.getElementById("yearly").textContent="₹"+yearly.toFixed(0);
document.getElementById("total").textContent=subs.length;
document.getElementById("active").textContent=subs.filter(s=>daysUntil(s.date)>=0).length;
document.getElementById("due").textContent=subs.filter(s=>daysUntil(s.date)>=0&&daysUntil(s.date)<=7).length;
document.getElementById("average").textContent="₹"+(subs.length?monthly/subs.length:0).toFixed(0);

const totals={};
subs.forEach(s=>{totals[s.category]=(totals[s.category]||0)+(s.cycle==="Yearly"?Number(s.amount||0)/12:Number(s.amount||0))});
const entries=Object.entries(totals).sort((a,b)=>b[1]-a[1]);
const bars=document.getElementById("bars"),noData=document.getElementById("noData");
if(entries.length){
noData.style.display="none";
const max=entries[0][1]||1;
entries.forEach(([cat,val])=>{
const row=document.createElement("div");row.className="bar-row";
row.innerHTML=`<label>${cat}</label><div class="bar-track"><div class="bar-fill" style="width:${Math.max(4,val/max*100)}%"></div></div><strong>₹${val.toFixed(0)}</strong>`;
bars.appendChild(row);
});
}