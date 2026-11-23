import {useEffect,useState} from 'react';
import axios from 'axios';
import { getToken, request } from '../../utils';
import { useSelector } from 'react-redux'; 


const useFetchEmps = (id,name,beginTime,endTime)=>{
    const [emps,setEmps]=useState([]);
    const [error,setError]=useState(null);
    const token=useSelector((state)=>{return state.userReducer.token}); //console.log("state",state);
    // make a request throught aiox w/ parameters
    useEffect(()=>{
        let gotName=!(name===null || name===undefined || name===''),
            gotId=!(id===0 || id===null || id===undefined);//console.log(gotId,gotName);console.log(id)
        let gotStt=!(beginTime===null || beginTime===undefined),
            gotEnd=!(endTime===null || endTime===undefined);

        if(gotId&&gotName)return;

        //eslint-disable-next-line 
        if(!gotId&&!gotName&&!gotStt&&!gotEnd)id=''; 
        //eslint-disable-next-line 
        if(!gotStt)beginTime="1111-11-11";  //console.log("beginTime:",beginTime);
        if(!gotEnd){//用js获取当前年月日的输出竟如此麻烦
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it’s 0-indexed
            const dd = String(today.getDate()).padStart(2, '0');
            //eslint-disable-next-line 
            endTime = `${yyyy}-${mm}-${dd}`;
            //console.log("endTime:",endTime); // Output: "yyyy-mm-dd"            
        };  //console.log(endTime)

        /*定义请求*/
        const fetchEmpsByID = async()=>{//ES7写法:async+await
            //console.log("Redux Token Before API Call:", token);
            //console.log("LocalStorage Token Before API Call:", getToken());
            try{
                //(1)注释掉的是 散装写法
                //let response = await axios.get(`http://127.0.0.1:8080/Employees/${id}`,//{params:param || {}}
                //); //console.log(response)
                //(2)启用的是 axios统一封装写法
                //console.log("getToken():",getToken());
                let response = await request.get(`/Employees/${id}`,{
                    headers:{token:`${getToken()}`} //Bearer 
                }); 
                //console.log("useFetchEmps中的response:",response);
                if(response.data.data!==null){ //这个判定可以帮助解决查询参数超范围的场景 ~ 
                    let ret = response.data.data;
                    setEmps(Array.isArray(ret) ? ret : [ret]);
                    //console.log(emps);
                }else{
                    setEmps([]);
                }
            }
            catch(err){
                console.log(err)
                setError(err.message);
            } 
        };//定义async fetchEmps()结束
        const fetchEmpsByName = async()=>{
            try{ 
                //console.log("dataStt:",beginTime);console.log("endTime:",endTime);
                //eslint-disable-next-line 
                if(!gotName)name='';
                //let response = await axios.get(`http://127.0.0.1:8080/emp_by_multi`,
                //    {params:{name,beginTime,endTime}}
                //); 
                let response = await request.get(`/emp_by_multi`,
                    {params:{name,beginTime,endTime}}
                ); 
                if(response.data.data!==null){ //这个判定可以帮助解决查询参数超范围的场景 ~ 
                    let ret = response.data.data.list;  //notice:要时刻关注后端传过来的嵌套格式...
                    setEmps(Array.isArray(ret) ? ret : [ret]);
                    //console.log(ret);
                }else{
                    setEmps([]);
                }
            }
            catch(err){
                console.log(err)
                setError(err.message);
            }
        }
        /*执行请求*/
        if (token) {  // Ensure token exists before making request
            console.log("Token updated, now fetching data...");
            fetchEmpsByID();
        }
        if(!gotName&&!gotStt&&!gotEnd){fetchEmpsByID();console.log("running: byId()")}
        else if(!gotId){fetchEmpsByName();console.log("running: byName()")}
    },[id,name,beginTime,endTime,token])//param改变的话会自动重新执行该hook

    return {emps,error};
}

export default useFetchEmps;