    /*登出模块*/
    import { useDispatch } from 'react-redux';
    import { clearToken } from '../../store/modules/userStore';
import { getToken,removeToken } from '../../utils';

    
    const LogOff = ()=>{
        // const dispatch = useDispatch();
        // const logoff = ()=>{
        //     console.log('logging off...');
        //     dispatch( clearToken() );
        // }
        // return (
        //     <a onClick={logoff} style={{ marginRight: "10px" }}>LogOff</a>
        // )
        console.log('logging off...');
        clearToken() ;
        removeToken();
        //console.log(getToken())//null
    }

    export default LogOff;