//Trạng thái sản phẩm
const buttonStatus = document.querySelectorAll("[button-status]");
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

//Sắp xếp sản phẩm theo tiêu chí
const divsort = document.querySelector("[sortCategory]");
if(divsort){
    let url = new URL(window.location.href);
    const selected = document.querySelector("[sort-select-category]");
    const sortClear = document.querySelector("[sort-clear-category]");
    selected.addEventListener("change", (e)=>{
        const value = e.target.value;
        let [sortKey, valueKey] = value.split("-");
        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("valueKey", valueKey);
        window.location.href = url.href;
    });
    sortClear.addEventListener("click",()=> {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("valueKey");
        window.location.href = url.href;
    });

    const value1 = url.searchParams.get("sortKey");
    const value2 = url.searchParams.get("valueKey");
    const sortString = `${value1}-${value2}`;
    if(sortString){
        const option = selected.querySelector(`option[value='${sortString}']`);
        if(option){
            option.selected = true;
        }
    }
}