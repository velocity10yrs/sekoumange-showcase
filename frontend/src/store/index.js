import { ReducerType, configureStore } from "@reduxjs/toolkit";

import userReducer from "./modules/userStore";

//创建root级别的store,集中放入所有其他xxStore
const store = configureStore({
    reducer:{
        userReducer
    }
})

export default store;