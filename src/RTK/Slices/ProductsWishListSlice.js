import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AidRedirectionAction, NavigateToAction, RedirectExecutionAction, RedirectToLoginAction, StartNavigation } from "./AuthorizationSlice";

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
    const { RedirectToLogin, aidRedirection } = getState().Authorization;    
    if(RedirectToLogin) {
        dispatch(NavigateToAction("login"));
        dispatch(StartNavigation());
    } else {
        await dispatch(AddToWishListAction(wished_product_id));
        return await dispatch(GetAllWishedProducts());
    }
})

export const RemoveFromWishListAction = createAsyncThunk("ProductsWishListSlice/removeToWishList", async (wished_product_id, { dispatch, getState }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry;    
    const response = await axios.delete(`http://localhost:3500/api/v1/wishlist/${wished_product_id}`, {
        headers: {
          'token': token,
          'currency': countryCurrency,
          'Content-Type': 'application/json'
        }
    });
});

export const RemoveThenGetWishList = createAsyncThunk("ProductsWishListSlice/removeThenGetWishList", async (wished_product_id, { dispatch }) => {
    await dispatch(RemoveFromWishListAction(wished_product_id));
    return await dispatch(GetAllWishedProducts());
})

export const GetAllWishedProducts = createAsyncThunk("ProductsWishListSlice/getAllWishedProducts", async (_, { dispatch, getState, rejectWithValue }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry;
    try {
        const response = await axios.get('http://localhost:3500/api/v1/wishlist', {
            headers: {
              'token': token,
              'currency': countryCurrency
            }
        });
        dispatch(RedirectToLoginAction(false));
        return response.data.cart.wishlistItems;        ;
    }
    catch(error) {
        if(error.response.data.err !== "wishlist not found")
            dispatch(RedirectToLoginAction(true));
        return rejectWithValue(error);
    }
})

export const ProductsWishListSlice = createSlice({
    name: "ProductsWishList",
    initialState: initialstate,
    extraReducers: builder => 
        builder
            .addCase(AddToWishListAction.pending, (state) => {
                state.WishListLoader = true;
            })
            .addCase(AddToWishListAction.fulfilled, (state, action) => {
                state.WishListLoader = false;
                // ProductsWishListSlice.caseReducers.addProductToWishList(state, action); //case reducer contains all the action types for the regular reducer 
            })
            .addCase(AddToWishListAction.rejected, (state) => {
                state.WishListLoader = false;
            })
            .addCase(GetAllWishedProducts.pending, (state) => {
                state.WishListLoader = true;
            })
            .addCase(GetAllWishedProducts.fulfilled, (state, action) => {
                state.WishListLoader = false;
                state.wishproducts = action.payload;
            })
            .addCase(GetAllWishedProducts.rejected, (state, action) => {
                state.WishListLoader = false;
                state.wishproducts = [];
            })
            .addCase(RemoveFromWishListAction.pending, (state, action) => {
                state.WishListLoader = true;
            })
            .addCase(RemoveFromWishListAction.fulfilled, (state, action) => {
                state.WishListLoader = false;
            })
            .addCase(RemoveFromWishListAction.rejected, (state, action) => {
                state.WishListLoader = false;
            })
})

export default ProductsWishListSlice.reducer;