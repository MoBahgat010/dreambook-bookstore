import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RedirectExecutionAction, RedirectToLoginAction } from "./AuthorizationSlice";

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
    const { RedirectToLogin } = getState().Authorization;    
    if(RedirectToLogin) {
        dispatch(RedirectExecutionAction(true));
    } else {
        await dispatch(AddToWishListAction(wished_product_id));
        return await dispatch(GetAllWishedProducts());
    }
})

export const RemoveFromWishListAction = createAsyncThunk("ProductsWishListSlice/removeToWishList", async (wished_product_id, { dispatch, getState }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry;    
    // console.log(wished_product_id);
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

export const GetAllWishedProducts = createAsyncThunk("ProductsWishListSlice/getAllWishedProducts", async (_, { dispatch, getState, rejectWithValue }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry;
    console.log(token);
    console.log(countryCurrency);
    try {
        const response = await axios.get('http://localhost:3500/api/v1/wishlist', {
            headers: {
              'token': token,
              'currency': countryCurrency
            }
        });
        // console.log(response);
        dispatch(RedirectToLoginAction(false));
        return response.data.result;
    }
    catch(error) {
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
                console.log(action.payload);
                
                state.WishListLoader = false;
                state.wishproducts = action.payload;
            })
            .addCase(GetAllWishedProducts.rejected, (state = initialstate) => {
                console.log("Hey I need authentication");
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