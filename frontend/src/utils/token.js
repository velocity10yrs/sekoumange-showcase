// 需要在本地localstorage持久化的属性token

const TOKEN_KEY = "token_key";
/* 因为频繁使用,封装token属性的getter/setter */
function setToken(token){
    localStorage.setItem(TOKEN_KEY,token);
}

function getToken(){
    //localStorage.setItem(TOKEN_KEY,"");
    const token = localStorage.getItem(TOKEN_KEY);
    //console.log("getToken():",token);
    return token;
}

function removeToken(){
    localStorage.removeItem(TOKEN_KEY);
}

export {
    setToken,
    getToken,
    removeToken
}