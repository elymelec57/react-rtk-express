import { configureStore } from '@reduxjs/toolkit'
import  employesReducer from '../features/employes/employes'

export const store = configureStore({
    reducer:{
        employes: employesReducer,
    }
})