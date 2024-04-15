import axios from "./axios";

export const apiRegister = (user)=> {
   return axios.post(`/users/register`,user);
}

export const apiLogin = (data)=> {
    return axios.post(`/users/login`,data);
}

export const apiLogout = (data)=> {
    return axios.post(`/users/logout`,data);
}

export const apiVerifyToken = (token) => {
    const tokenVerify = {
        token
    }
    return axios.post(`/users/verify`,tokenVerify);
}

export const apiEditProfile = (data)=> {
    return axios.put(`/users/edit/profile`,data);
}

export const getEmployes = ()=> {
    return axios.get(`/employes/`);
}

export const agregarEmployes = (data)=> {
    return axios.post(`/employes/crearEmpleado`,data);
}

export const updateEmployes = (data,user)=> {
    return axios.put(`/employes/updateEmpleado/${data.id}`,user);
}

export const eliminarEmployes = (data)=> {
    return axios.delete(`/employes/eliminarEmpleado/${data}`);
}


