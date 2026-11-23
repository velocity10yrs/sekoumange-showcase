//该文件是入口

//必要的2个核心包
import React from 'react';
import ReactDOM from 'react-dom/client';
// import cors from 'cors';

//导入组件
import App from './App';
import {Provider} from 'react-redux';
import { Router, RouterProvider } from 'react-router-dom';
import store from './store';
import router from './router'
import Layout from './pages/Layout/layout';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>            
        <Provider store={store}>
            <RouterProvider  router={router}/>
        </Provider>
    </React.StrictMode>
)



//root.render(<App />);

//跨域配置
//const cors=require("cors");
//App.use(cors());//允许全域名->该方法报错
