//Trạng thái sản phẩm
const buttonStatus = document.querySelectorAll("[button-status]");
console.log(buttonStatus);
if(buttonStatus){
    buttonStatus.forEach(item =>{
        let url = new URL(window.location.href);
        item.addEventListener("click", ()=>{
            const status = item.getAttribute("button-status");
            if(status){
                url.searchParams.set("status", status);
            }
            else{
                url.searchParams.delete("status");
            }
            window.location.href = url.href;     
        });
    })
}

//Tìm kiếm sản phẩm
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e)=>{
        e.preventDefault();
        let search = e.target.elements.keyword.value; // Lấy giá trị ô input
        console.log(e);
        if(search){
            url.searchParams.set("keyword", search);
        }
        else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}

//Phân trang
const pagination = document.querySelectorAll("[button-page]");
if(pagination){
    let url = new URL(window.location.href);
    pagination.forEach(item =>{ 
        item.addEventListener("click", (e)=>{
            e.preventDefault();
            const index = item.getAttribute("button-page");
            url.searchParams.set("page", index);
            item.classList.add("page-link");
            window.location.href = url.href;
        });
    });
}