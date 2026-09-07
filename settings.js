const toast=document.getElementById("toast");
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove("show"),2000)}

document.getElementById("backBtn").addEventListener("click",()=>{window.location.href="dashboard.html"});

const editAccountBtn=document.getElementById("editAccountBtn");
const accountForm=document.getElementById("accountForm");
editAccountBtn.addEventListener("click",()=>{accountForm.classList.toggle("open");editAccountBtn.textContent=accountForm.classList.contains("open")?"Close":"Edit"});

document.getElementById("saveAccountBtn").addEventListener("click",()=>{
const name=document.getElementById("nameInput").value.trim();
const email=document.getElementById("emailInput").value.trim();
const phone=document.getElementById("phoneInput").value.trim();
if(!name){showToast("Please enter your name.");return}
if(!email){showToast("Please enter your email.");return}
document.getElementById("displayName").textContent=name;
document.getElementById("displayEmail").textContent=email;
document.getElementById("avatar").textContent=name.charAt(0).toUpperCase();
localStorage.setItem("psd_name",name);localStorage.setItem("psd_email",email);localStorage.setItem("psd_phone",phone);
accountForm.classList.remove("open");editAccountBtn.textContent="Edit";showToast("Account information saved.");
});

const savedName=localStorage.getItem("psd_name"),savedEmail=localStorage.getItem("psd_email"),savedPhone=localStorage.getItem("psd_phone");
if(savedName){document.getElementById("displayName").textContent=savedName;document.getElementById("nameInput").value=savedName;document.getElementById("avatar").textContent=savedName.charAt(0).toUpperCase()}
if(savedEmail){document.getElementById("displayEmail").textContent=savedEmail;document.getElementById("emailInput").value=savedEmail}
if(savedPhone){document.getElementById("phoneInput").value=savedPhone}

const currencySelect=document.getElementById("currencySelect"),currencyValue=document.getElementById("currencyValue"),savedCurrency=localStorage.getItem("psd_currency");
if(savedCurrency){currencySelect.value=savedCurrency;currencyValue.textContent=savedCurrency}
currencySelect.addEventListener("change",()=>{currencyValue.textContent=currencySelect.value;localStorage.setItem("psd_currency",currencySelect.value);showToast("Currency updated.")});

const notificationToggle=document.getElementById("notificationToggle"),savedNotifications=localStorage.getItem("psd_notifications");
if(savedNotifications!==null)notificationToggle.checked=savedNotifications==="true";
notificationToggle.addEventListener("change",()=>{localStorage.setItem("psd_notifications",notificationToggle.checked);showToast(notificationToggle.checked?"Notifications enabled.":"Notifications disabled.")});

const reminderToggle=document.getElementById("reminderToggle"),savedReminders=localStorage.getItem("psd_reminders");
if(savedReminders!==null)reminderToggle.checked=savedReminders==="true";
reminderToggle.addEventListener("change",()=>{localStorage.setItem("psd_reminders",reminderToggle.checked);showToast(reminderToggle.checked?"Payment reminders enabled.":"Payment reminders disabled.")});

const appearanceSelect=document.getElementById("appearanceSelect"),appearanceValue=document.getElementById("appearanceValue"),savedAppearance=localStorage.getItem("psd_appearance");
function applyAppearance(mode){document.body.classList.toggle("dark",mode==="dark");appearanceValue.textContent=mode==="dark"?"Dark Mode":"Light Mode"}
if(savedAppearance){appearanceSelect.value=savedAppearance;applyAppearance(savedAppearance)}
appearanceSelect.addEventListener("change",()=>{localStorage.setItem("psd_appearance",appearanceSelect.value);applyAppearance(appearanceSelect.value);showToast(appearanceSelect.value==="dark"?"Dark mode enabled.":"Light mode enabled.")});

document.getElementById("passwordBtn").addEventListener("click",()=>showToast("Change Password selected."));
document.getElementById("privacyBtn").addEventListener("click",()=>showToast("Privacy settings selected."));
document.getElementById("helpBtn").addEventListener("click",()=>showToast("Help & Support selected."));
document.getElementById("aboutBtn").addEventListener("click",()=>showToast("PSD My Work - Version 1.0.0"));
document.getElementById("logoutBtn").addEventListener("click",()=>{if(window.confirm("Do you want to log out?"))window.location.href="index.html";});