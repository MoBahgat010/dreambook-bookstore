import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n";
import i18next from "i18next";

const initialState = {
    allExistedProducts: [],
    FetchedProducts: [],
    filteredProducts: [],
    certainProduct: {},
    ProductsLoader: false,
    allCategories: [],
    allSubCategories: [],
    allAuthors: [],
    totalPages: 0,
    startToFilter: false
}

export const FetchProducts = createAsyncThunk("FetchProductsSlice/fetchProducts", async (pageNumber,{ getState }) => {
    const { countryCurrency } = getState().SelectCountry;
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/products?page=${pageNumber}`, {
        headers: {
            currency: countryCurrency
        }
    })
    return response.data;
})

export const FetchCertainProduct = createAsyncThunk("FetchProductsSlice/fetchCertainProducts", async (id,{ getState }) => {
    const { countryCurrency } = getState().SelectCountry;
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/products/${id}`,{
        headers: {
            currency:  countryCurrency
        }
    })
    return response.data.result;
})

export const GetAllCategories = createAsyncThunk("FetchProductsSlice/getAllCategories", async (_, { getState }) => {
    const { countryCurrency } = getState().SelectCountry;
    try {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "api/v1/categories", {
            headers: {
                "accept-language": i18next.language,
                "currency": countryCurrency
            }
        })
        return response.data.result;
    }
    catch(error) {
        console.log(error);
    }
})

export const GetSpecificCategory = createAsyncThunk("FetchProductsSlice/getSpecificCategory", async (category_id, { getState }) => {
    const { countryCurrency } = getState().SelectCountry;
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/categories/${category_id}`, {
            headers: {
                "accept-language": i18next.language,
                "currency": countryCurrency
            }
        })
        return response.data.products;
    }
    catch(error) {
        console.log(error);
    }
})

export const GetAllSubCategories = createAsyncThunk("FetchProductsSlice/getAllSubCategories", async (_, { getState }) => {
    const { countryCurrency } = getState().SelectCountry;
    try {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "api/v1/subcategory", {
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

export const GetSpecificSubCategory = createAsyncThunk("FetchProductsSlice/getSpecificSubCategory", async (subCategory_id, { getState }) => {
    const { countryCurrency } = getState().SelectCountry;
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/subcategory/${subCategory_id}`, {
            headers: {
                "accept-language": i18next.language,
                "currency": countryCurrency
            }
        })
        console.log(response);
        return response.data.products;
    }
    catch(error) {
        console.log(error);
    }
})

export const GetAllAuthors = createAsyncThunk("FetchProductsSlice/getAllAuthors", async (_, { getState }) => {
    const { countryCurrency } = getState().SelectCountry;
    try {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "api/v1/authors", {
            headers: {
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
    reducers: {
        ClearFilteredProducts: state => {
            state.filteredProducts = [];
        },
        SetFilterStatus: (state, action) => {
            state.startToFilter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            /******************************FetchProducts******************************/
            .addCase(FetchProducts.pending, (state = initialState) => {
                state.ProductsLoader = true;
            })
            .addCase(FetchProducts.fulfilled, (state = initialState, action) => {
                // let x = [...action.payload, ...action.payload, ...action.payload]
                state.startToFilter = false;
                state.FetchedProducts = action.payload.result
                state.totalPages = action.payload.totalPages
                state.ProductsLoader = false;
            })
            /******************************FetchProducts******************************/
            ///////////////////////////////////////////////////////////////////////////////
            /******************************FetchCertainProduct******************************/
            .addCase(FetchCertainProduct.pending, (state = initialState) => {
                state.ProductsLoader = true;
            })
            .addCase(FetchCertainProduct.fulfilled, (state = initialState, action) => {
                state.certainProduct = action.payload;
                state.ProductsLoader = false;
            })
            /******************************FetchCertainProduct******************************/
            ///////////////////////////////////////////////////////////////////////////////
            /******************************GetAllCategories******************************/
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
            /******************************GetAllCategories******************************/
            ///////////////////////////////////////////////////////////////////////////////
            /******************************GetSpecificCategory******************************/
            .addCase(GetSpecificCategory.pending, (state, action) => {
                // state.ProductsLoader = true;
            })
            .addCase(GetSpecificCategory.fulfilled, (state, action) => {
                state.filteredProducts = [...state.filteredProducts, ...action.payload]
                // state.ProductsLoader = false;
            })
            .addCase(GetSpecificCategory.rejected, (state, action) => {
                // state.ProductsLoader = false;
            })
            /******************************GetSpecificCategory******************************/
            /////////////////////////////////////////////////////////////////////////////////
            /******************************GetAllSubCategories******************************/
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
            /******************************GetAllSubCategories******************************/
            /////////////////////////////////////////////////////////////////////////////////
            /******************************GetSpecificSubCategory******************************/
            .addCase(GetSpecificSubCategory.pending, (state, action) => {
                // state.ProductsLoader = true;
            })
            .addCase(GetSpecificSubCategory.fulfilled, (state, action) => {
                state.filteredProducts = [...state.filteredProducts, ...action.payload]
                // state.ProductsLoader = false;
            })
            .addCase(GetSpecificSubCategory.rejected, (state, action) => {
                // state.ProductsLoader = false;
            })
            /******************************GetSpecificSubCategory******************************/
            .addCase(GetAllAuthors.pending, (state, action) => {
                state.ProductsLoader = true;
            })
            .addCase(GetAllAuthors.fulfilled, (state, action) => {
                state.allAuthors = action.payload;
                state.ProductsLoader = false;
            })
            .addCase(GetAllAuthors.rejected, (state, action) => {
                state.ProductsLoader = false;
            })
        }
})

export const { ClearFilteredProducts, SetFilterStatus } = FetchProductsSlice.actions;
export default FetchProductsSlice.reducer;