import { configureStore } from '@reduxjs/toolkit'
import  employesReducer from '../features/employes/employes'
import loginReducer from '../features/login/loginSlice'

export const store = configureStore({
    reducer:{
        employes: employesReducer,
        login: loginReducer
    }
})