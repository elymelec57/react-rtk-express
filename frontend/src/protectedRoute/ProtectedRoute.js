import { useSelector, useDispatch } from "react-redux";
import { verifyToken } from "../features/login/loginSlice";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRouter = () => {

    const sendToken = useDispatch();
    const { auth, cargando } = useSelector(
        (state) => state.login
    );

    useEffect(()=>{
        const cookies = Cookies.get();
        if(cookies){
            sendToken(verifyToken(cookies.token));
        }
    },[]);

    if(cargando && !auth){
        return <Navigate to="/" replace />
    }
    if(!cargando && auth){
        return <Outlet/>
    }
    if(!cargando && !auth){
        return <Navigate to="/" replace />
    }

}

export default ProtectedRouter;