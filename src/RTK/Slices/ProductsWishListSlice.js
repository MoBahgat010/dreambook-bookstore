import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialstate = {
    wishproducts: [],
    WishListLoader: false
}

export const AddToWishListAction = createAsyncThunk("ProductsWishListSlice/addToWishList", async (wished_product, { getState }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry;
    const response = await axios.patch(
        'http://localhost:3500/api/v1/wishlist',
        '',
        {
          params: {
            'products': wished_product.id
          },
          headers: {
            'token': token,
            'currency': countryCurrency,
            'content-type': 'application/x-www-form-urlencoded'
          }
        }
    );
    return wished_product;
})

export const GetAllWishedProducts = createAsyncThunk("ProductsWishListSlice/getAllWishedProducts", async (_, { getState }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry;
    const response = await axios.get('http://localhost:3500/api/v1/wishlist', {
        headers: {
          'token': token,
          'currency': countryCurrency
        }
    });
    console.log(response.data.result);
    return response.data.result;
})

export const ProductsWishListSlice = createSlice({
    name: "ProductsWishList",
    initialState: initialstate,
    reducers: {
        addProductToWishList: (state, action) => {
            console.log(action.payload);
            state.wishproducts.push(action.payload);
        },
        removeProductFromWishList: (state, action) => {
            state.wishproducts = state.wishproducts.filter((product) => product.id !== action.payload);
            // state.wishproducts.splice(action.payload, 1);
        }
    },
    extraReducers: builder => 
        builder
            .addCase(AddToWishListAction.pending, (state) => {
                state.WishListLoader = true;
            })
            .addCase(AddToWishListAction.fulfilled, (state = initialstate, action) => {
                state.WishListLoader = false;                
                ProductsWishListSlice.caseReducers.addProductToWishList(state, action); //case reducer contains all the action types for the regular reducer 
            })
            .addCase(GetAllWishedProducts.pending, (state = initialstate, action) => {
                state.WishListLoader = true;
            })
            .addCase(GetAllWishedProducts.fulfilled, (state = initialstate, action) => {
                console.log("I've finished here");
                state.WishListLoader = false;
                state.wishproducts = action.payload;
            })
})

export const { addProductToWishList, removeProductFromWishList } = ProductsWishListSlice.actions;
export default ProductsWishListSlice.reducer;