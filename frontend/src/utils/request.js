import axios from 'axios';
import {getToken} from './token';
//local
const URL = '127.0.0.1';//127.0.0.1 URL里的空格字符会变成->%20
const request = axios.create({
    baseURL:`http://${URL}:8081`,
    timeout: 5000
});


//request拦截器 : 
//  在请求发送前可以进行处理
request.interceptors.request.use(
    (config)=>{
        const token=getToken();//console.log("axios中的token:",token);
        if(token){
            // config.headers.token = `Bearer ${token}`; //Authorization
        }else{
            //console.log("token is missing,it's not stored.")
        };
            //console.log("config headers:",config.headers);
        return config;
    },
    (error)=>{return Promise.reject(error)}
)

//response拦截器:
//   对返回的数据处理
request.interceptors.response.use(
    (response)=>{//console.log("axios中的res:",response);
    return response},
    (error)=>{return Promise.reject(error)}
)

export {request}