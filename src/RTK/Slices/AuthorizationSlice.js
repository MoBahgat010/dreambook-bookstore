import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { HideLoader, ShowLoader } from "./ComponentsSlice";


const initialState = {
    token: localStorage.getItem("token") == null ? "" : localStorage.getItem("token"),
    loader: false,
    RedirectToLogin: false,
    RedirectExecution: false,
    RegenerateData: true,
    LoginAfterRegister: false,
    aidRedirection: false,
    message: ""
}

export const RegisterAuthorization = createAsyncThunk("AuthorizationSlice/register", async ({ name, email, password }, { getState }) => {
    const { countryCurrency } = getState().SelectCountry;
    console.log(countryCurrency);
    const response = await axios.post(
        'https://dreambook-bookstore.vercel.app/api/v1/auth/signup',
        {
            'email': email,
            'name': name,
            'password': password,
        },
        {
            headers: {
                "currency": countryCurrency,
                'Content-Type': 'application/json'
          }
        }
      );
    console.log(response.data);
    return response;
})

export const LoginAuthorization = createAsyncThunk("AuthorizationSlice/login", async ({ email, password }, { getState, rejectWithValue }) => {
    const { countryCurrency } = getState().SelectCountry;
    try {
        const response = await axios.post(
            'https://dreambook-bookstore.vercel.app/api/v1/auth/signin',
            {
                'email': email,
                'password': password
            },
            {
                headers: {
                    'currency': countryCurrency,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.token;  
    }
    catch(error) {
        return rejectWithValue(error);
    }
})

export const AuthorizationSlice = createSlice({
    name: "AuthorizationSlice",
    initialState,
    reducers: {
        RedirectToLoginAction(state, action) {
            // console.log("here in aurthorization");
            // console.log(action.payload);
            state.RedirectToLogin = action.payload;
        },
        RedirectExecutionAction(state = initialState, action) {
            state.RedirectExecution = action.payload;
        },
        AidRedirectionAction(state = initialState, action) {
            state.aidRedirection = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(RegisterAuthorization.pending, (state = initialState) => {
                state.loader = true;
            })
            .addCase(RegisterAuthorization.fulfilled, (state = initialState) => {
                state.loader = false;
                // state.RedirectToLogin = false;
                // state.RedirectExecution = false;
                state.LoginAfterRegister = true;
            })
            .addCase(LoginAuthorization.pending, (state = initialState) => {
                state.loader = true;
            })
            .addCase(LoginAuthorization.fulfilled, (state = initialState, action) => {
                AuthorizationSlice.caseReducers.RedirectToLoginAction(state, { payload: false });
                state.loader = false;
                state.token = action.payload;
                console.log("token ", state.token);
                localStorage.setItem("token", state.token);
                state.RedirectToLogin = false;
                state.RedirectExecution = false;
                state.aidRedirection = !state.aidRedirection;
                state.RegenerateData = !state.RegenerateData;
            })
            .addCase(LoginAuthorization.rejected, (state = initialState, action) => {
                state.loader = false;
                state.message = action.payload.response.data.err;
            })
    }
})

export const { RedirectToLoginAction, RedirectExecutionAction } = AuthorizationSlice.actions;
export default AuthorizationSlice.reducer;