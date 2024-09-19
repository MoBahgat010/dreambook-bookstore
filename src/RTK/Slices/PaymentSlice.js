import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialstate = {
    redirectURL: null
}

export const SendPayment = createAsyncThunk("PaymentSlice/SendPayment", async (shippingAddress, { getState, dispatch, rejectWithValue }) => {
    const { token } = getState().Authorization;
    const { cartId } = getState().Cart;
    try {
        const response = await axios.post("http://localhost:3500/api/v1/orders/pay/" + cartId,
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
        console.log(response.data);
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
            .addCase(SendPayment.pending, (state, action) => {
                
            })
            .addCase(SendPayment.fulfilled, (state, action) => {
                state.redirectURL = action.payload.redirectUrl;
            })
});

export default PaymentSlice.reducer;