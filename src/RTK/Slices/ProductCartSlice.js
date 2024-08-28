import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AidRedirectionAction, NavigateToAction, RedirectExecutionAction, RedirectToLoginAction, StartNavigation } from "./AuthorizationSlice";
import { ErrorIcon } from "react-hot-toast";

const initialstate = {
    CartProducts: [],
    Cartloader: false,
    cartTotal: 0,
    InsuffecientProductQuantity: false
}

export const AddToCartAction = createAsyncThunk("ProductCartSlice/addToCart", async ({ id, quantity}, { dispatch, getState, rejectWithValue }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry; 
    try {
        const response = await axios.post('http://localhost:3500/api/v1/carts', {
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
    }
    catch(error) {
        return rejectWithValue(error.response.data.err);
    }
})

export const RemoveFromCart = createAsyncThunk("ProductCartSlice/RemoveFromCart", async (id, { getState }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry;
    const response = await axios.delete(`http://localhost:3500/api/v1/carts/${id}`, {
        headers: {
          'token': token,
          'currency': countryCurrency,
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: ''
    });
})

export const AddThenGetCartProducts = createAsyncThunk("ProductCartSlice/addThenGetCartProducts", async ({ id, quantity }, { dispatch, getState }) => {
    const { RedirectToLogin, aidRedirection } = getState().Authorization;    
    if(RedirectToLogin) {
        dispatch(NavigateToAction("login"));
        dispatch(StartNavigation());
    } else {
        await dispatch(AddToCartAction({ id, quantity }));
        return await dispatch(GetAllCartProducts());
    }
})

export const RemoveThenGetCartProducts = createAsyncThunk("ProductCartSlice/removeThenGetCartProducts", async (id, { dispatch, getState }) => {
    await dispatch(RemoveFromCart(id));
    return await dispatch(GetAllCartProducts());
})

export const UpdateQuantity = createAsyncThunk("ProductCartSlice/updateCartProducts", async ({id, quantity},{ getState, rejectWithValue }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry;
    try {
        const response = await axios.put(
            `http://localhost:3500/api/v1/carts/${id}`,
            {
              'quantity': quantity
            },
            {
              headers: {
                'token': token,
                'currency': countryCurrency,
                'Content-Type': 'application/json'
              }
            }
        );
        return response;
    }
    catch(error) {
        return rejectWithValue(error.response.data.err);
    }
})

export const UpdateQuantityThenGetCartProducts = createAsyncThunk("ProductCartSlice/updateQuantityThenGetCartProducts", async (updatedData, { dispatch }) => {
    await dispatch(UpdateQuantity(updatedData));
    return await dispatch(GetAllCartProducts());
})

export const GetAllCartProducts = createAsyncThunk("ProductCartSlice/GetAllCartProducts", async (_, { getState, dispatch, rejectWithValue }) => {
    const { token } = getState().Authorization;
    const { countryCurrency } = getState().SelectCountry;
    try {
        const response = await axios.get('http://localhost:3500/api/v1/carts', {
            headers: {
              'token': token,
              'currency': countryCurrency
            }
        })
        return response.data;
    }
    catch (error) {
        if(error.response.data.err !== "Cart not found") {
            dispatch(RedirectToLoginAction(true));
            // dispatch(RedirectExecutionAction(false));
        }
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
        },
    },
    extraReducers: builder =>
        builder
            .addCase(AddToCartAction.pending, (state) => {
                state.Cartloader = true;
            })
            .addCase(AddToCartAction.fulfilled, (state) => {
                state.Cartloader = false;
            })
            .addCase(AddToCartAction.rejected, (state, action) => {
                if(action.payload === "Insufficient product quantity")
                    state.InsuffecientProductQuantity = !state.InsuffecientProductQuantity;
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
                state.cartTotal = action.payload.cart.totalPriceExchanged.toFixed(2);
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
            .addCase(UpdateQuantity.pending, (state) => {
                state.Cartloader = true;
            })
            .addCase(UpdateQuantity.fulfilled, (state) => {
                state.Cartloader = false;
            })
            .addCase(UpdateQuantity.rejected, (state, action) => {  
                // if(action.payload === "Insufficient product quantity")
                //     state.InsuffecientProductQuantity = !state.InsuffecientProductQuantity;
                state.Cartloader = false;
            })
}) 

export const { addProduct, removeProduct } = ProductCartSlice.actions;
export default ProductCartSlice.reducer;