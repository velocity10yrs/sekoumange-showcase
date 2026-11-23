//授权路径:
//   无登陆token直接跳转回login页

import { getToken } from "../utils";
import { Navigate } from "react-router-dom";
import {message} from "antd";

const AuthRoute = ({children})=>{
    const token = getToken();//console.log("token:",token);

    if((token!==undefined) && (token!==null) && (token!=='') ){
        //console.log("authorized")
        return <>{children}</>
    }else{
        message.error('まずはログインからお願いします');
        return <Navigate to={"/login"} replace/>
    }
}

export default AuthRoute;