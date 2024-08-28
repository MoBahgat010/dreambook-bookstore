import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n";
import i18next from "i18next";

const initialState = {
    FetchedProducts: [],
    certainProduct: {},
    ProductsLoader: false,
    allCategories: [],
    allSubCategories: []
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
    const response = await axios.get(`http://localhost:3500/api/v1/products/${id}`,{
        headers: {
            currency:  countryCurrency
        }
    })
    return response.data.result;
})

export const GetAllCategories = createAsyncThunk("FetchProductsSlice/getAllCategories", async (_, { getState }) => {
    const { countryCurrency } = getState().SelectCountry;
    try {
        const response = await axios.get("http://localhost:3500/api/v1/categories", {
            headers: {
                "accept-language": i18next.language,
                "currency": countryCurrency
            }
        })
        console.log(response);
        return response.data.result;
    }
    catch(error) {
        console.log(error);
    }
})

export const GetAllSubCategories = createAsyncThunk("FetchProductsSlice/getAllSubCategories", async (_, { getState }) => {
    const { countryCurrency } = getState().SelectCountry;
    try {
        const response = await axios.get("http://localhost:3500/api/v1/subcategory", {
            headers: {
                "accept-language": i18next.language,
                "currency": countryCurrency
            }
        })
        console.log(response);
        return response.data.result;
    }
    catch(error) {
        console.log(error);
    }
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
                // let x = [...action.payload, ...action.payload, ...action.payload]
                state.FetchedProducts = action.payload
                state.ProductsLoader = false;
            })
            .addCase(FetchCertainProduct.pending, (state = initialState) => {
                state.ProductsLoader = true;
            })
            .addCase(FetchCertainProduct.fulfilled, (state = initialState, action) => {
                state.certainProduct = action.payload;
                state.ProductsLoader = false;
            })
            .addCase(GetAllCategories.pending, (state, action) => {
                state.ProductsLoader = true;
            })
            .addCase(GetAllCategories.fulfilled, (state, action) => {
                state.allCategories = action.payload;
                state.ProductsLoader = false;
            })
            .addCase(GetAllCategories.rejected, (state, action) => {
                state.ProductsLoader = false;
            })
            .addCase(GetAllSubCategories.pending, (state, action) => {
                state.ProductsLoader = true;
            })
            .addCase(GetAllSubCategories.fulfilled, (state, action) => {
                state.allSubCategories = action.payload;
                state.ProductsLoader = false;
            })
            .addCase(GetAllSubCategories.rejected, (state, action) => {
                state.ProductsLoader = false;
            })
    }
})

export default FetchProductsSlice.reducer;