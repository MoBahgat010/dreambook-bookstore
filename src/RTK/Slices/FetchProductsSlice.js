import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    FetchedProducts: [],
    ProductsLoader: false
}

export const FetchProducts = createAsyncThunk("FetchProductsSlice/FetchProducts", async () => {
    const response = await axios.get("http://localhost:3500/api/v1/products", {
        headers: {
            currency: "KWD"
        }
    })
    return response;
})

export const FetchProductsSlice = createSlice({
    name: 'FetchProducts',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(FetchProducts.pending, (state = initialState) => {
                state.ProductsLoader = true;
            })
            .addCase(FetchProducts.fulfilled, (state = initialState, action) => {
                console.log("I've finished");
                state.FetchedProducts = action.payload.data.result
                state.ProductsLoader = false;
            })
    }
})

export default FetchProductsSlice.reducer;