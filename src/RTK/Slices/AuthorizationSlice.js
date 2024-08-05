import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { HideLoader, ShowLoader } from "./ComponentsSlice";


const initialState = {
    token: localStorage.getItem("token") == null ? "" : localStorage.getItem("token"),
    loader: false
}

export const RegisterAuthorization = createAsyncThunk("AuthorizationSlice/register", async ({ name, email, password }) => {
    const response = await axios.post(
        'http://localhost:3500/api/v1/auth/signup',
        {
            'email': email,
            'name': name,
            'password': password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    console.log(response.data);
    return response;
})

export const LoginAuthorization = createAsyncThunk("AuthorizationSlice/login", async ({ email, password }) => {
    const response = await axios.post(
        'http://localhost:3500/api/v1/auth/signin',
        {
            'email': email,
            'password': password
        },
        {
            headers: {
                'currency': 'KWD',
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data.token;  
})

export const AuthorizationSlice = createSlice({
    name: "AuthorizationSlice",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(RegisterAuthorization.pending, (state = initialState) => {
                state.loader = true;
            })
            .addCase(RegisterAuthorization.fulfilled, (state = initialState) => {
                state.loader = false;
            })
            .addCase(LoginAuthorization.pending, (state = initialState) => {
                state.loader = true;
            })
            .addCase(LoginAuthorization.fulfilled, (state = initialState, action) => {
                state.loader = false;
                state.token = action.payload;
                localStorage.setItem("token", state.token);
            })
    }
})

export default AuthorizationSlice.reducer;