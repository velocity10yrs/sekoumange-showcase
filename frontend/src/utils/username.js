// 需要在本地localstorage持久化的属性username

const USER_NAME = "USER_NAME";
/* 因为频繁使用,封装token属性的getter&setter */
function setUsername(username){
    localStorage.setItem(USER_NAME,username);
}

function getUsername(){

    const username = localStorage.getItem(USER_NAME);

    return username;
}

function removeUsername(){
    localStorage.removeItem(USER_NAME);
}

export {
    setUsername,
    getUsername,
    removeUsername
}