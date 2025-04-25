//Permission
const tablePermission = document.querySelector("[table-permission]");
const formPermission = document.querySelector("#form-permission");
const inputForm = formPermission.querySelector("[name='permission']");
if(tablePermission){
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", ()=>{
        let permission =[];
        const rows = tablePermission.querySelectorAll("[data-name]");
        rows.forEach(item =>{
            const name = item.getAttribute("data-name");
            const inputs = item.querySelectorAll("input");
            // console.log(inputs);
            if(name == "id"){
                inputs.forEach(input =>{
                    const id = input.value;
                    permission.push({
                        id: id,
                        permission: []
                    });
                });
            }else{
                inputs.forEach((input, index)=>{
                    const checked = input.checked;
                    if(checked == true){
                        permission[index].permission.push(name);
                    }
                    
                });
            }
        });
        //console.log(permission);
        if(permission.length > 0){
            inputForm.value = JSON.stringify(permission);
            formPermission.submit();
        }
    })
}
//End Permission

//Data record

const divRecord = document.querySelector("#data-record");
if(divRecord){
    const dataRecord = divRecord.getAttribute("data-record");
    const tablePermission = document.querySelector("[table-permission]");
    const result = JSON.parse(dataRecord);
    result.forEach((item, index )=>{
        const permission = item.permission;
        
        permission.forEach(permission =>{
            const rows = tablePermission.querySelector(`[data-name="${permission}"]`);
            const input = rows.querySelectorAll("input")[index];

            input.checked = true;
        })
        
    });
}


