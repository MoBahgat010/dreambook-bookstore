import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialstate = {
    redirectURL: null,
    shippingData: {}
}

export const GetUserOrders = createAsyncThunk("PaymentSlice/getUserOrders", async (_, { getState, dispatch, rejectWithValue}) => {
    const { CartProducts } = getState().Cart;
    const { token } = getState().Authorization;
    try {
        const response = await axios.get( process.env.REACT_APP_BASE_URL + "api/v1/orders", {
            headers: {
                'token': token      
            }
        })
        let ShippingData = {};
        response.data.orders.forEach(order => {
            if(order.isPaid === "PENDING")
            {
                if(order.cartItems.length == CartProducts.length)
                {
                    let flag = true;
                    order.cartItems.forEach(order_product => {
                        let temp_flag = false;
                        CartProducts.forEach(product => {
                            temp_flag |= JSON.stringify(product.product) == JSON.stringify(order_product.product);
                        })
                        flag &= temp_flag;
                    })
                    if(flag) 
                        ShippingData = order.shippingAddress;
                }
            }
        });
        return ShippingData;
    }
    catch(error) {
        return rejectWithValue(error);
    }
})

export const SendPayment = createAsyncThunk("PaymentSlice/sendPayment", async (shippingAddress, { getState, dispatch, rejectWithValue }) => {
    const { token } = getState().Authorization;
    const { cartId } = getState().Cart;
    // console.log("api/v1/orders/pay/" + cartId);
    try {
        const response = await axios.post( process.env.REACT_APP_BASE_URL + "api/v1/orders/pay/" + cartId,
            {
                "shippingAddress": {
                  "street": shippingAddress.street,
                  "building": shippingAddress.building,
                  "area": shippingAddress.area,
                  "floor": shippingAddress.floor,
                  "apartment": shippingAddress.apartment,
                  "city": shippingAddress.city,
                  "phone": shippingAddress.phone,
                  "country": shippingAddress.country
                }
            },
            {
                headers: {
                    "token": token
                },
            }
        )
        return response.data;
    }
    catch(error) {

    }
})

export const PaymentSlice = createSlice({
    name: "payment",
    initialState: initialstate,
    extraReducers: builder =>
        builder
            .addCase(SendPayment.fulfilled, (state, action) => {
                state.redirectURL = action.payload.redirectUrl;
            })
            .addCase(GetUserOrders.fulfilled, (state, action) => {
                state.shippingData = action.payload;
            })
});

export default PaymentSlice.reducer;