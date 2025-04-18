module.exports = (query, countRecord)=>{
    let objectPage = {
        indexPage: 1,
        limitItem: 1
    }
    if(query.page){
        objectPage.indexPage = Number(query.page); 
    }
    const itemPage = Math.ceil(countRecord / objectPage.limitItem);
    objectPage.numberPage = itemPage;
    objectPage.skip = (objectPage.indexPage - 1 )*objectPage.limitItem;
    return objectPage;
}