import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialstate = {
    wishproducts: [],
    WishListLoader: false
}

export const AddToWishListAction = createAsyncThunk("ProductsWishListSlice/addToWishList", async (wished_product_id, { dispatch, getState }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry;    
    const response = await axios.post(
        `http://localhost:3500/api/v1/wishlist/${wished_product_id}`,
        '',
        {
          headers: {
            'token': token,
            'currency': countryCurrency,
            'content-type': 'application/x-www-form-urlencoded'
          }
        }
    );
})

export const AddThenGetWishList = createAsyncThunk("ProductsWishListSlice/addThenGetWishList", async (wished_product_id, { dispatch, getState }) => {
    await dispatch(AddToWishListAction(wished_product_id));
    return await dispatch(GetAllWishedProducts());
})

export const RemoveFromWishListAction = createAsyncThunk("ProductsWishListSlice/removeToWishList", async (wished_product_id, { dispatch, getState }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry;    
    console.log(wished_product_id);
    const response = await axios.delete('http://localhost:3500/api/v1/wishlist', {
        headers: {
          'token': token,
          'currency': countryCurrency,
          'Content-Type': 'application/json'
        },
        data: {
          'product': wished_product_id
        }
    });
});

export const RemoveThenGetWishList = createAsyncThunk("ProductsWishListSlice/removeThenGetWishList", async (wished_product_id, { dispatch }) => {
    await dispatch(RemoveFromWishListAction(wished_product_id));
    return await dispatch(GetAllWishedProducts());
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
    extraReducers: builder => 
        builder
            .addCase(AddToWishListAction.pending, (state) => {
                state.WishListLoader = true;
            })
            .addCase(AddToWishListAction.fulfilled, (state = initialstate, action) => {
                state.WishListLoader = false;
                // ProductsWishListSlice.caseReducers.addProductToWishList(state, action); //case reducer contains all the action types for the regular reducer 
            })
            .addCase(AddToWishListAction.rejected, (state = initialstate) => {
                state.WishListLoader = false;
            })
            .addCase(GetAllWishedProducts.pending, (state = initialstate) => {
                state.WishListLoader = true;
            })
            .addCase(GetAllWishedProducts.fulfilled, (state = initialstate, action) => {
                state.WishListLoader = false;
                state.wishproducts = action.payload;
            })
            .addCase(GetAllWishedProducts.rejected, (state = initialstate) => {
                state.WishListLoader = false;
            })
            .addCase(RemoveFromWishListAction.pending, (state = initialstate, action) => {
                state.WishListLoader = true;
            })
            .addCase(RemoveFromWishListAction.fulfilled, (state = initialstate, action) => {
                state.WishListLoader = false;
            })
            .addCase(RemoveFromWishListAction.rejected, (state = initialstate, action) => {
                state.WishListLoader = false;
            })
})

export default ProductsWishListSlice.reducer;