import React, { useRef , useState , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Layout, Menu, Popconfirm, message } from 'antd';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { clearUsername, fetchLogin } from '../../store/modules/userStore';
import { clearToken } from '../../store/modules/userStore';
import css from './layout.scss';

const MyLayout = ()=>{
    const myLayout=useRef(null);

    const [current, setCurrent] = useState('home');
    const items = [
        {
          label: 'Home',
          key: '/home',
        },
        {
          label: 'Map',
          key: '/map',
        },
        {
          label: 'Chart',
          key: '/barlinepie',
        },
        {
          label: 'PunchCard',
          key: '/punchcard',
        },
        {
          label: 'Sheet',
          key: '/sheet',
        },
        {
          label: 'Material',
          key:'/material',
        }
        // {
        //   label: (<div>
        //            <span className='user-info' ></span>
        //            <span className='user-logoff' >
        //              <Popconfirm title='ログアウトされますか?'　okText='Yes' cancelText='No'>
        //                 Log off
        //              </Popconfirm>
        //            </span>
        //          </div>),
        //   key: 'logoff'
        // }
      ];
    let navi=useNavigate();
    const onClick = (e) => {
      //console.log('click ', e);
      navi(e.key);//(1)导航
      setCurrent(e.key);//(2)选中样式
    };
    let dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchLogin)
    },[dispatch]);
    const onConfirm = ()=>{
        //console.log('ログアウト確認')
        dispatch( clearToken() );
        dispatch( clearUsername() ); //(0303)
        message.success('LOGGED OUT');
        navi('/login');
    };

    const username = useSelector(state=>{ //(0303)
      //console.log(state.userReducer.username);
      return state.userReducer.username;
    }); //
    return (
        // <Layout style={{backgroundImage:'url(/stoneage.jpeg)',backgroundSize:'cover'}}>
        <div 
          ref={myLayout}
          className={`${css}`}
          style={{
          background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('/stoneage.jpeg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "75em",   /*此处决定了背景高度,也是outlet元素的高度*/
          }}
        >
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{backgroundColor:'rgb(232,155,0,.3)'}}/>
            <span className='user-icon' style={{position:'absolute',left:'85%',top:'.3em',width:'2.5em',height:'2.5em',textAlign:'center',alignItems:'center',display:'block',backgroundImage:'url(/avatar/allen.png)',backgroundSize:'cover'}}></span>
            <span className='user-info' style={{position:'absolute',left:'88%',top:'1em',width:'5em',height:'1.5em',textAlign:'center',alignItems:'center',lineHeight:'1.5em',display:'block'}}>Hi, {username} !</span>
            <button style={{position:'relative',left:'93%',right:'-1em',top:'-2em',width:'5em',height:'1.5em',textAlign:'center',alignItems:'center',lineHeight:'1em',borderRadius:'5px',display:'block'}}>
                
                <span className='user-logoff'>
                  <Popconfirm title='ログアウトされますか?'　okText='Yes' cancelText='No' onConfirm={onConfirm}>
                     Log off
                  </Popconfirm>
                </span>
            </button>
            <Outlet/>
            
        </div>
    );
}

export default MyLayout;