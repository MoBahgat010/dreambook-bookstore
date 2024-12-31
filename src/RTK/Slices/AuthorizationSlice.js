import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { HideLoader, ShowLoader } from "./ComponentsSlice";


const initialState = {
    login_token: localStorage.getItem("login_token") == null ? "" : localStorage.getItem("login_token"),
    loader: false,
    RedirectToLogin: false,
    // RedirectExecution: false,
    RegenerateData: true,
    LoginAfterRegister: false,
    // LoginAfterRegisterExecution: false,
    // aidRedirection: false,
    message: "",
    NavigateTo: "",
    StartNavigation: ""
}

export const LogOut = createAsyncThunk("AuthorizationSlice/logout", async (_,{ getState, dispatch, rejectWithValue }) => {
    const { login_token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry;
    try {
        const response = await axios.post(
            process.env.REACT_APP_BASE_URL + 'api/v1/auth/logout',
            '',
            {
              headers: {
                'token': login_token,
                'currency': countryCurrency
              }
            }
        );
        // dispatch(NavigateToAction(""));
        dispatch(StartNavigation());
    }
    catch(error) {
        rejectWithValue(error);
    }
})

export const RegisterAuthorization = createAsyncThunk("AuthorizationSlice/register", async ({ name, email, password }, { getState, rejectWithValue }) => {
    const { countryCurrency } = getState().SelectCountry;
    try {
        const response = await axios.post(
            process.env.REACT_APP_BASE_URL + 'api/v1/auth/signup',
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
        return response;
    }
    catch(error) {
        return rejectWithValue(error);
    }
})

export const LoginAuthorization = createAsyncThunk("AuthorizationSlice/login", async ({ email, password }, { getState, dispatch, rejectWithValue }) => {
    const { countryCurrency } = getState().SelectCountry;
    try {
        const response = await axios.post(
            process.env.REACT_APP_BASE_URL + 'api/v1/auth/signin',
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
        // dispatch(RedirectExecutionAction(false));
        // dispatch(NavigateToAction(""));
        dispatch(StartNavigation());
        return response.data.token;  
    }
    catch(error) {
        return rejectWithValue(error);
    }
})

export const ForgotPassword = createAsyncThunk("AuthorizationSlice/forgotPassword", async (email) => {
    try {
        const response = await axios.patch(
            process.env.REACT_APP_BASE_URL + 'api/v1/auth/forgetpassword',
            {
              'email': email
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
        );
    }
    catch(error) {

    }
})

export const ResetPasswrod = createAsyncThunk("AuthorizationSlice/resetPasswrod", async ({new_password, temp_token}, { getState, dispatch, rejectWithValue }) => {
    try {
        const response = await axios.patch(
            process.env.REACT_APP_BASE_URL + 'api/v1/auth/resetpassword/',
            {
              'password': new_password
            },
            {
              params: {
                'token': temp_token
              },
              headers: {
                'Content-Type': 'application/json'
              }
            }
        );
        dispatch(NavigateToAction("login"));
        dispatch(StartNavigation());
        return(response);
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

export const AuthorizationSlice = createSlice({
    name: "AuthorizationSlice",
    initialState,
    reducers: {
        RedirectToLoginAction(state, action) {
            state.RedirectToLogin = action.payload;
        },
        setMessage(state, action) {
            state.message = action.payload;
        },
        AidRedirectionAction(state = initialState, action) {
            state.aidRedirection = action.payload;
        },
        NavigateToAction(state, action) {
            state.NavigateTo = action.payload;
        },
        StartNavigation(state) {
            state.StartNavigation += "1";
        },
        // LoginAfterRegisterExecutionAction(state) {
        //     state.LoginAfterRegisterExecution = !state.LoginAfterRegisterExecution;
        // },
        // LoginAfterRegisterAction(state) {
        //     state.LoginAfterRegister = true;
        // }
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
                state.LoginAfterRegister = !state.LoginAfterRegister;
            })
            .addCase(RegisterAuthorization.rejected, (state, action) => {
                state.loader = false;
                state.message = action.payload.response.data.err;
            })
            .addCase(LoginAuthorization.pending, (state = initialState) => {
                state.loader = true;
            })
            .addCase(LoginAuthorization.fulfilled, (state = initialState, action) => {
                AuthorizationSlice.caseReducers.RedirectToLoginAction(state, { payload: false });
                state.loader = false;
                state.login_token = action.payload;
                localStorage.setItem("login_token", state.login_token);
                state.RedirectToLogin = false;
                state.RedirectExecution = false;
                state.aidRedirection = !state.aidRedirection;
                state.RegenerateData = !state.RegenerateData;
                state.message = "";
            })
            .addCase(LoginAuthorization.rejected, (state = initialState, action) => {
                state.loader = false;
                state.message = action.payload.response.data.err;
            })
            .addCase(LogOut.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(LogOut.fulfilled, (state, action) => {
                state.loader = false;
                state.login_token = null;
                state.RedirectToLogin = true;
                state.RedirectExecution = false;
                localStorage.removeItem("login_token");
                state.aidRedirection = !state.aidRedirection;
                state.RegenerateData = !state.RegenerateData;
            })
            .addCase(LogOut.rejected, (state, action) => {
                state.loader = false;
            })
            .addCase(ForgotPassword.pending, (state) => {
                state.loader = true;
            })
            .addCase(ForgotPassword.fulfilled, (state) => {
                state.loader = false;
            })
            .addCase(ForgotPassword.rejected, (state) => {
                state.loader = false;
            })
            .addCase(ResetPasswrod.pending, (state) => {
                state.loader = true;
            })
            .addCase(ResetPasswrod.fulfilled, (state, action) => {
                state.message = action.payload.data.message;
                state.loader = false;
            })
            .addCase(ResetPasswrod.rejected, (state, action) => {
                state.loader = false;
            })
    }
})

export const { RedirectToLoginAction, AidRedirectionAction, NavigateToAction, StartNavigation, setMessage } = AuthorizationSlice.actions;
export default AuthorizationSlice.reducer;