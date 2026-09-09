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

const darkModeToggle=document.getElementById("darkModeToggle"),appearanceValue=document.getElementById("appearanceValue");
const savedTheme=localStorage.getItem("pst_theme")||"light";
darkModeToggle.checked=savedTheme==="dark";
appearanceValue.textContent=darkModeToggle.checked?"Dark Mode":"Light Mode";
darkModeToggle.addEventListener("change",()=>{
const mode=darkModeToggle.checked?"dark":"light";
localStorage.setItem("pst_theme",mode);
document.documentElement.classList.toggle("dark",darkModeToggle.checked);
appearanceValue.textContent=darkModeToggle.checked?"Dark Mode":"Light Mode";
showToast(darkModeToggle.checked?"Dark mode enabled.":"Light mode enabled.");
});

document.getElementById("passwordBtn").addEventListener("click",()=>showToast("Change Password selected."));
document.getElementById("privacyBtn").addEventListener("click",()=>showToast("Privacy settings selected."));
document.getElementById("helpBtn").addEventListener("click",()=>showToast("Help & Support selected."));
document.getElementById("aboutBtn").addEventListener("click",()=>showToast("PST My Work - Version 1.0.0"));
document.getElementById("logoutBtn").addEventListener("click",()=>{
if(window.confirm("Do you want to log out?")){
  localStorage.removeItem("pst_logged_in");
  localStorage.removeItem("pst_user_email");
  window.location.href="login.html";
}
});