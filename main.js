document.querySelectorAll(".primary-btn,.secondary-btn,.cta a").forEach(link=>{
link.addEventListener("click",()=>{localStorage.setItem("psd_last_page","home")});
});