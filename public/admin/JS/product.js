//Button status
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0){
    //lấy URL hiện tại
    let url = new URL(window.location.href);

    buttonStatus.forEach(button =>{
        button.addEventListener("click", ()=>{
            //Lấy tất cả giá trị Attribute: button-status
            const status = button.getAttribute("button-status");

            //Cập nhật URL với searchParams
            if(status){
                url.searchParams.set("status", status);
            }
            else{
                url.searchParams.delete("status");
            }
            //Chuyển hướng tới URL mới và làm lại trang
            window.location.href = url.href
        })
    })
}

//Form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    // Lấy URL hiện tại
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault(); // Ngăn tải lại trang

        let search = e.target.elements.keyword?.value || ""; // Lấy giá trị ô input

        if (search) {
            url.searchParams.set("keyword", search); // Thêm keyword vào URL
        } else {
            url.searchParams.delete("keyword"); // Xóa nếu rỗng
        }

        // Chuyển hướng tới URL mới
        window.location.href = url.href;
    });
} else {
    console.warn("Không tìm thấy form #form-search!");
}

//Pagination
const PageLink = document.querySelectorAll("[button-page]");
if(PageLink){
    PageLink.forEach((button) => {
        button.addEventListener('click', ()=>{
            let url = new URL(window.location.href);
            const indexpage = button.getAttribute("button-page");
            url.searchParams.set("page", indexpage);
            window.location.href = url.href;
        })
    })
}

//Checkbox product
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("click", ()=>{
        inputsId.forEach(input =>{
           if(inputCheckAll.checked){
            input.checked = true;
           }
           else{
            input.checked = false;
           }
        })
    });

    inputsId.forEach(input =>{
        input.addEventListener("click", ()=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name = 'id']:checked").length;
            
            // console.log(countChecked);
            // console.log(inputsId.length);
            if(countChecked == inputsId.length){
                inputCheckAll.checked = true;
            }
            else{
                inputCheckAll.checked = false;
            }
        })
    })
    
}

// form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e)=>{
        e.preventDefault();
        //Lấy table chứa các sản phẩm đó
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        //Lấy các sản phẩm đã click
        const inputChecked = checkboxMulti.querySelectorAll("input[name = 'id']:checked");
        const typeChange = e.target.elements.type.value;
        if(typeChange == "deleted"){
            const isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này chứ?");
            if(!isConfirm){
                return;
            }
        }
        //Duyệt các id đã tích
        if(inputChecked.length > 0){  
            let ids = [];
            const inputsId = formChangeMulti.querySelector("input[name = 'ids']");//giá trị của thanh nhập tìm kiếm
            inputChecked.forEach(input =>{
                const id = input.value;
                if(typeChange == "changePosition"){
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                }else{
                    ids.push(id);
                }   
            });
            //console.log(ids.join(", "));
            inputsId.value = ids.join(", ");
            formChangeMulti.submit();
        }
        else{
            alert("Vui lòng chọn ít nhất một sản phẩm");
        }
    })
}

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

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){   
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change", e=>{
        const file = e.target.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
            console.log(uploadImagePreview.src);
            //console.log(uploadImagePreview.src);
            const deleteImage = document.querySelector(".delete-btn");
            deleteImage.classList.remove("d-none");
            //console.log(deleteImage);
            deleteImage.addEventListener("click", ()=>{
                uploadImagePreview.src = "";
                deleteImage.classList.add("d-none");
            })
        }
    });
}

//Sắp xếp sản phẩm
const sortProduct = document.querySelector("[sort]");
if(sortProduct){
    let url = new URL(window.location.href);
    const selectItem = document.querySelector("[sort-select]");
    const sortClear = document.querySelector("[sort-clear]");
    selectItem.addEventListener("change", (e)=>{
        const value = e.target.value;
        let [sortKey, sortValue] = value.split("-");
        
        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);
        window.location.href = url.href;
    });
    sortClear.addEventListener("click", ()=>{
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href
    });

    //option 
    const value1 = url.searchParams.get("sortKey");
    const value2 = url.searchParams.get("sortValue");
    const sortString = `${value1}-${value2}`;
    if(sortString){
        const optionSeleted = selectItem.querySelector(`option[value='${sortString}']`);
        if(optionSeleted){
            optionSeleted.selected = true;
        }
    }
    
}

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
        });
    });
}
