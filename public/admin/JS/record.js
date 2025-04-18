

const formChange = document.querySelector("[form-change-status]");
const buttonStatusCategory = document.querySelectorAll("[button-change-status]");

const path = formChange.getAttribute("path");
if(buttonStatusCategory.length > 0){
    buttonStatusCategory.forEach(button =>{
        button.addEventListener("click", ()=>{
            const typeStatus = button.getAttribute("data-status");
            const statusChange = (typeStatus == "active") ? "inactive" : "active";
            const idStatus = button.getAttribute("data-id");
            const action = path + `/${statusChange}/${idStatus}?_method=PATCH`;
            console.log(action);
            formChange.action = action;
            formChange.submit();
        });
    })
}
