import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiVerifyToken, apiLogout, apiEditProfile } from '../../api/api';

const initialState = {
    auth: false,
    loading: false,
    loginUser: [],
    cargando: true,
    error: "",
    response: "",
};

export const verifyToken = createAsyncThunk(
    "login/verifyToken", async (token) => {
        
        const res = await apiVerifyToken(token);
        return res.data;
    }
)

export const logout = createAsyncThunk(
    "login/logout", async () => {
        
        const res = await apiLogout();
        return res.data;
    }
)

// esta llamada a la api edita los datos de perfil del usuario
export const editProfile = createAsyncThunk(
    "login/profile", async (data) => {
        
        const res = await apiEditProfile(data);
        return res.data;
    }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
    reducers: {
        loginUser:(state,action)=>{
            state.loginUser = action.payload;
            state.auth = true;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(verifyToken.fulfilled, (state,action)=>{
            
            if(action.payload.status){
                state.loginUser = action.payload.userAuth;
                state.auth = true;
                state.cargando = false;
            }else{
                state.auth = false;
                state.cargando = false;
            }
        });
        builder.addCase(logout.fulfilled, (state,action)=>{
            state.auth = false;
            state.cargando = false;
        });
        builder.addCase(editProfile.fulfilled, (state,action)=>{
            state.loginUser = action.payload.userAuth;
        });
    }
})

export const { loginUser } = loginSlice.actions

export default loginSlice.reducer 