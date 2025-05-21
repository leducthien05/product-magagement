module.exports = (query)=>{
    let keySearch = {
        key: "",
    }

    if(query.keyword){
        keySearch.key = query.keyword;
        
        const regex = new RegExp(keySearch.key, "i");
        keySearch.regex = regex;
    }
    return keySearch;
}