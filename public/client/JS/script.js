// Hiện thị thông báo
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const timeClose = parseInt(showAlert.getAttribute("data-tiem"));
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
        //showAlert.remove();//Cách 2
    }, timeClose);
    const closeAlert = showAlert.querySelector("[alert-close]");
    closeAlert.addEventListener("click", ()=>{
        showAlert.classList.add("alert-hidden");
    });
}