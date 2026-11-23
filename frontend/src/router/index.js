import { createBrowserRouter } from 'react-router-dom';

import Login from '../pages/Login/login'
import Home from '../pages/Home/home'
import {BarLinePie,Map,PunchCard} from '../pages/Charts/index'
import SheetModule from '../pages/Sheets/sheet'
import AuthRoute from '../components/AuthRoute';
import MyLayout from '../pages/Layout/layout';
import Material from '../pages/Charts/chart_material/chart_material';
 
const router = createBrowserRouter([
    // {
    //     path:'/',
    //     element:<h1>welcome!</h1>
    // },
    {
        path:'/',
        element:<AuthRoute><MyLayout/></AuthRoute>,
        children:[
            {
                path:'/home',
                element:<AuthRoute><Home/></AuthRoute>
            },
            {
                path:'/map',
                element:<AuthRoute><Map/></AuthRoute>
            },
            {
                path:'/barlinepie',
                element:<AuthRoute><BarLinePie/></AuthRoute>
            },
            {
                path:'/punchcard',
                element:<AuthRoute><PunchCard/></AuthRoute>
            },
            {
                path:'/sheet',
                element:<AuthRoute><SheetModule/></AuthRoute>
            },
            {
                path:'/material',
                element:<AuthRoute><Material/></AuthRoute>
            }
        ]
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/*',
        element:(<h1>404 not found</h1>)
    },

])

export default router;