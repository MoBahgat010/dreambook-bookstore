import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    FetchedProducts: [],
    certainProduct: {},
    ProductsLoader: false
}

export const FetchProducts = createAsyncThunk("FetchProductsSlice/fetchProducts", async (_,{ getState }) => {
    const { countryCurrency } = getState().SelectCountry;
    let flag = true;
    let i = 1;
    let allFetchedProducts = [];
    while(flag) {
        const response = await axios.get(`http://localhost:3500/api/v1/products?page=${i++}`, {
            headers: {
                currency: countryCurrency
            }
        })
        if(response.data.result.length)
            allFetchedProducts = [...allFetchedProducts, ...response.data.result]
        else
            flag = false;
    }
    return allFetchedProducts;
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
                console.log("I am here now")
                state.ProductsLoader = true;
            })
            .addCase(FetchProducts.fulfilled, (state = initialState, action) => {
                console.log(action.payload)
                let x = [...action.payload, ...action.payload, ...action.payload]
                state.FetchedProducts = x
                state.ProductsLoader = false;
            })
            .addCase(FetchCertainProduct.pending, (state = initialState) => {
                console.log("I am here now")
                state.ProductsLoader = true;
            })
            .addCase(FetchCertainProduct.fulfilled, (state = initialState, action) => {
                console.log("I am here now")
                // console.log("I've finished");
                state.certainProduct = action.payload;
                state.ProductsLoader = false;
            })
    }
})

export default FetchProductsSlice.reducer;