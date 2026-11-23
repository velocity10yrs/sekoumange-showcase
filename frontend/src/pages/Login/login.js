import React,{useEffect} from 'react';
import { Button,Space,Input,Card,Form,message } from 'antd';
import { fetchLogin } from '../../store/modules/userStore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../utils/token'; 

const Login = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values)=>{
        //console.log(values) //测试hook挂上没
        /*(1)发送请求*/
        const result = await dispatch(fetchLogin(values)); // 将user.js里的token实时修改;
        // console.log(result)
        /*(2)跳转页面(仅在成功时)*/
        if(result!==undefined && result!==null && result!==''){
            //dispatch(setToken(result));  // Update Redux
            setToken(result);           // Update localStorage
            navigate('/home');
        /*(3)hint*/
            message.success('LOGIN SUCCESS');
        }else{
            message.error('ユーザーネーム或はパスワードは違っています');
        }
    };

    return (
        <div id="login" style={{position:'absolute',top:'0',bottom:'0',left:'0',right:'0', alignItems:'center', textAlign:'center'}}>

            <Card className='login-container' style={{width:'30em',height:'25em',
                           position:'relative',top:'10em',bottom:'0',left:'37%',right:'auto',
                           backgroundColor:'RGB(231,190,156,0.3)'}}>
                {/* logo */}
                <div style={{alignItems:'normal',Height:'2em',display:'flex'}}>
                    <img className='login-logo' src="/logo_stone.svg" alt="logo" style={{width:'2.5em',height:'2.5em',color:'#ace',flex:'1'}}/>
                    <h3 style={{color:'#ace',height:'28px',flex:'2.5',textAlign:'left'}}>施工管理システム</h3>
                </div>
                {/* form */}
                <Form style={{marginTop:'3em'}} validateTrigger='onBlur' onFinish={onFinish}>
                    <Form.Item
                      name='username'
                      rules={[
                        {required:true,
                         message:'ユーザーネームが必要',
                        },{
                        //  pattern:/^0-9a-zA-Z_.{3,20}$/,
                        //  message:'3桁から20桁まで数字、英文字を入力可能',
                        }
                      ]}
                    >
                        <Input size='large' placeholder='アカウント入力'/>
                    </Form.Item>
                    <Form.Item
                      name='password'
                      rules={[
                        {required:true,
                         message:'パスワードが必要'
                        },{
                        //  pattern:/^0-9a-zA-Z_.{3,20}$/,
                        //  message:'3桁から20桁まで数字、英文字を入力可能'
                        }
                      ]}
                    >
                        <Input size='large' placeholder='パスワード入力'/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' size='large' block > ログイン </Button>
                    </Form.Item>
                </Form>
            </Card>
            
            


            {/* 之前自己写的 */}
            {/* <h3 style={{position:'relative',top:'5em',marginBottom:'1.5em',color:'#ace'}}>施工管理システム</h3>
            <Space direction="vertical" size="middle" 
                   style={{width:'20em',height:'15em',
                           position:'relative',top:'10em',bottom:'0',left:'auto',right:'auto',
                           backgroundColor:'RGB(255,255,255,0.5)',alignItems:'center',textAlign:'center',lineHeight:'3em'}}>
                <Space.Compact style={{marginBottom:'-1em'}}>
                <Input placeholder="アカウントをここに入力" />
                </Space.Compact>

                <Space.Compact>
                <Input placeholder="パスワードをここに入力" />
                </Space.Compact>
 
                <Space.Compact>
                <Button type='primary'>submit</Button>
                </Space.Compact>
            </Space> */}
        </div>
    )
}
export default Login;