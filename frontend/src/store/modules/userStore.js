/*
*  本文件可以对比理解为DAO层的实体类
*  使用redux插件编写
*/
import {createSlice} from '@reduxjs/toolkit';
import {request} from '../../utils/request.js';
import { setToken as _setToken, getToken, removeToken } from '../../utils/index';
import { setUsername as _setUsername, getUsername, removeUsername } from '../../utils/index';

const userStore = createSlice({
    name:"user",
    initialState:{ //初始值
        //token:localStorage.getItem('token_key')||"",
        token:getToken() || '',
        username:getUsername() || '', //(0303)
    },
    reducers:{ //业务逻辑放置处
        setToken(state,action){//修改token的
            state.token = action.payload; //(1)存浏览器
            localStorage.setItem('token_key',action.payload); //(2)存本地缓存
            _setToken(action.payload); //(2)经过redux存本地缓存
        },
        clearToken(state){//退出登陆的
            state.token='';//(1)从redux中清除
            removeToken(); //(2)从缓存中清除
        },
        setUsername(state,action){ //(0303)
            state.username = action.payload;
            //localStorage.setItem('USER_NAME',action.payload);
            _setUsername(action.payload);
        },
        clearUsername(state){ //(0303)
            state.username='';
            removeUsername();
        },
    }
})

const {setToken,clearToken,setUsername,clearUsername} = userStore.actions;  //拿出actionCreator
const userReducer = userStore.reducer; //取出修改函数
/* 发请求获取token的方法写这里(事实上写在login模块里也可以,但是那个文件主要装html太乱了) */
const fetchLogin = (loginForm)=>{ //所谓loginForm就是{username,password}组成的json
    return async (dispatch)=>{
        const res= await request.post("/login",loginForm);//这个post是自封装request的方法
        //console.log(res)
        if(res.data.data===null)return res.data.data; //(0407:登陆失败时仍返回string)
        dispatch(setToken(res.data.data[0])); //!!~把redux管理的token赋值~! //注意这里写的属性名与后端result实体类写法有关
        //console.log("当前ret为:",res.data.data);       
        dispatch(setUsername(res.data.data[1])); //(0303:为了减少接口请求次数,将获取用户名的功能绑在这里)
        return res.data.data[0]; //为了实现判定正确登陆与否,得返回token; (03.02)为返回更多用户信息连同后端项目修改了返回格式(arraylist[3]);
    }
}
/* 获取用户个人信息的方法 */ 
// const fetchUserInfo = ()=>{
//     return async (dispatch)=>{
//         const res= await request.get('/Employee/${id}');
//         dispatch(setUserInfo(res.data));
//     }
// }


export {fetchLogin,setToken,clearToken,setUsername,clearUsername};        //只暴露修改的方法,而不是变量的完整权限,类似springboot的setter;
export default userReducer;