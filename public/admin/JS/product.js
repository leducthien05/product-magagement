// Change status

const ButtonChangeStatus = document.querySelectorAll("[button-change-status]");
const formChangeStatus = document.querySelector("#form-change-status");
const path = formChangeStatus.getAttribute("data-path");
console.log(path);
if(ButtonChangeStatus.length > 0){
    ButtonChangeStatus.forEach(button =>{
        button.addEventListener("click", (e)=>{
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            let statusChange = statusCurrent == "active" ? "inactive" : "active";
            
            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            console.log(formChangeStatus.action);
            formChangeStatus.submit();

        });
        
    });
}
// End Change status

//Xóa tạm thời sản phẩm khỏi trang sản phẩm
const buttonDelete = document.querySelectorAll("[button-delete]");
const formDelete = document.querySelector("#form-delete");
const pathDelete = formDelete.getAttribute("data-path");
console.log(pathDelete);
if(buttonDelete.length > 0){
    buttonDelete.forEach(button =>{
        button.addEventListener("click", ()=>{
        const isConfirm = confirm("OK");
        if(isConfirm){
            const id = button.getAttribute("id-delete");
            const action = `${pathDelete}/${id}?_method=DELETE`;
            formDelete.action = action;
            console.log(action);
            formDelete.submit();
        }
        })
    });
}
