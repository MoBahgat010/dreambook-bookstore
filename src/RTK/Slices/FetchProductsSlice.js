import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    FetchedProducts: [],
    certainProduct: {},
    ProductsLoader: false
}

export const FetchProducts = createAsyncThunk("FetchProductsSlice/fetchProducts", async (_,{ getState }) => {
    const { countryCurrency } = getState().SelectCountry;
    // console.log("here in fetch products:::", countryCurrency);
    const response = await axios.get("http://localhost:3500/api/v1/products", {
        headers: {
            currency: countryCurrency
        }
    })
    console.log(response);
    return response;
})

export const FetchCertainProduct = createAsyncThunk("FetchProductsSlice/fetchCertainProducts", async (id,{ getState }) => {
    const { countryCurrency } = getState().SelectCountry;
    // console.log("here in fetch products:::", countryCurrency);
    const response = await axios.get(`http://localhost:3500/api/v1/products/${id}`,{
        headers: {
            currency:  countryCurrency
        }
    })
    return response.data.result;
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
                // console.log("I've finished");
                state.FetchedProducts = action.payload.data.result
                state.ProductsLoader = false;
            })
            .addCase(FetchCertainProduct.pending, (state = initialState) => {
                state.ProductsLoader = true;
            })
            .addCase(FetchCertainProduct.fulfilled, (state = initialState, action) => {
                // console.log("I've finished");
                state.certainProduct = action.payload;
                state.ProductsLoader = false;
            })
    }
})

export default FetchProductsSlice.reducer;