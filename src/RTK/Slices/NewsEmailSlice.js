import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialstate = {
    isemailSent: false,
    isEmailSubmitted: false
}

export const SendEmail = createAsyncThunk("NewsEmailSlice/SendEmail", async (email, { getState, dispatch, rejectWithValue }) => {
    try {
        const response = await axios.post(
            process.env.REACT_APP_BASE_URL + 'api/v1/newsletter',
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
        return rejectWithValue(error.response.data.err)
    }
})

const NewsEmailSlice = createSlice({
    name: 'newsEmail',
    initialState: initialstate,
    reducers: {
        resetEmail: (state) => {
            state.isemailSent = false;
            state.isEmailSubmitted = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(SendEmail.fulfilled, (state) => {
                state.isEmailSubmitted = true;
                state.isemailSent = true;
            })
            .addCase(SendEmail.rejected, (state) => {
                state.isEmailSubmitted = true;
                state.isemailSent = false
            })
    }
})

export const { resetEmail } = NewsEmailSlice.actions
export default NewsEmailSlice.reducer