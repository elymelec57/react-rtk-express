import { useSelector, useDispatch } from "react-redux";
import { verifyToken } from "../features/login/loginSlice";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

const Auth = () => {

    const sendToken = useDispatch();
    const { auth } = useSelector(
        (state) => state.login
    );

    useEffect(()=>{
        const cookies = Cookies.get();
        if(cookies){
            sendToken(verifyToken(cookies.token));
        }
    },[]);

    if(auth){
        return <Navigate to="/employes" replace />
    }else{
        return <Outlet/>
    }
   

}

export default Auth;