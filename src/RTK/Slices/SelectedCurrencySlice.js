import { createSlice } from "@reduxjs/toolkit";

const initalstate = {
    currencyName: "KWD",
    countryName: "Kuwait"
}

export const SelectedCurrencySlice = createSlice({
    name: "selectedCurrency",
    initialState: initalstate,
    reducers: {
        // changeCurrency: (state, action) => {
        //     state.currencyName = action.payload.currencyName;
        //     state.countryName = action.payload.countryName;
        // }
    }
})

export const { changeCurrency } = SelectedCurrencySlice.actions;
export default SelectedCurrencySlice.reducer