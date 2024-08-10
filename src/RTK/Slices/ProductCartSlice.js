import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RedirectExecutionAction, RedirectToLoginAction } from "./AuthorizationSlice";

const initialstate = {
    CartProducts: [],
    Cartloader: false,
    cartTotal: 0
}

export const AddToCartAction = createAsyncThunk("ProductCartSlice/addToCart", async ({ id, quantity}, { dispatch, getState }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry; 
    console.log(token," ",countryCurrency);
    
    const response = await axios.post('https://dreambook-bookstore.vercel.app/api/v1/carts', {
        'product': id,
        'quantity': quantity
      }, {
        headers: {
          'token': token,
          'currency': countryCurrency,
          'Content-Type': 'application/json'
        }
      }
    );
})

export const RemoveFromCart = createAsyncThunk("ProductCartSlice/RemoveFromCart", async (id, { getState }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry;
    // console.log(id);
    const response = await axios.delete(`https://dreambook-bookstore.vercel.app/api/v1/carts/${id}`, {
        headers: {
          'token': token,
          'currency': countryCurrency,
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: ''
    });
})

export const AddThenGetCartProducts = createAsyncThunk("ProductCartSlice/addThenGetCartProducts", async ({ id, quantity }, { dispatch, getState }) => {
    const { RedirectToLogin } = getState().Authorization;    
    // console.log(RedirectToLogin);
    if(RedirectToLogin) {
        dispatch(RedirectExecutionAction(true));
    } else {
        await dispatch(AddToCartAction({ id, quantity }));
        return await dispatch(GetAllCartProducts());
    }
})

export const RemoveThenGetCartProducts = createAsyncThunk("ProductCartSlice/removeThenGetCartProducts", async (id, { dispatch, getState }) => {
    await dispatch(RemoveFromCart(id));
    return await dispatch(GetAllCartProducts());
})

export const GetAllCartProducts = createAsyncThunk("ProductCartSlice/GetAllCartProducts", async (_, { getState, rejectWithValue }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry;
    try {
        const response = await axios.get('https://dreambook-bookstore.vercel.app/api/v1/carts/66aba74fb6d50900ca642d3f', {
            headers: {
              'token': token,
              'currency': countryCurrency
            }
        })
        // console.log(response.data);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

export const ProductCartSlice = createSlice({
    name: 'productCart',
    initialState: initialstate,
    reducers: {
        addProduct: (state, action) => {
            let flag = true;
            state.CartProducts.forEach(product => {
                if (product.id === action.payload.id) {
                    product.quantity += action.payload.quantity; 
                    // state.cartTotal += action.payload.quantity * action.payload.price;
                    flag = false;
                }
            });
            if(flag) {
                // state.cartTotal += action.payload.quantity * action.payload.price;
                state.CartProducts.push(action.payload);
            }
        },
        removeProduct: (state, action) => {
            state.CartProducts = state.CartProducts.filter(product => product.id !== action.payload.id);
            // state.cartTotal -= action.payload.quantity * action.payload.price;
        },
        GetCartProducts: (state = initialstate, action) => {
            state.CartProducts = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(AddToCartAction.pending, (state = initialstate) => {
                state.Cartloader = true;
            })
            .addCase(AddToCartAction.fulfilled, (state = initialstate) => {
                state.Cartloader = false;
            })
            .addCase(AddToCartAction.rejected, (state = initialstate) => {
                state.Cartloader = false;
            })
            .addCase(RemoveFromCart.pending, (state) => {
                state.Cartloader = true;
            })
            .addCase(RemoveFromCart.fulfilled, (state) => {
                state.Cartloader = false;
            })
            .addCase(RemoveFromCart.rejected, (state) => {
                state.Cartloader = false;
            })
            .addCase(GetAllCartProducts.pending, (state = initialstate) => {
                state.Cartloader = true;
            })
            .addCase(GetAllCartProducts.fulfilled, (state = initialstate, action) => {
                // console.log(action.payload);
                state.cartTotal = action.payload.totalPrice;
                state.CartProducts = action.payload.cart.cartItems;
                state.Cartloader = false;
            })
            .addCase(GetAllCartProducts.rejected, (state = initialstate, action) => {                
                state.Cartloader = false;
                state.CartProducts = [];
                state.cartTotal = 0;
                if(action.payload.response.data.err !== "Cart not found")
                    localStorage.removeItem("token");
            })
}) 

export const { addProduct, removeProduct } = ProductCartSlice.actions;
export default ProductCartSlice.reducer;