import { configureStore } from "@reduxjs/toolkit";
import SelectCountrySlice from "./Slices/SelectedCountrySlice"
import SelectedCurrencySlice from "./Slices/SelectedCurrencySlice"

export const store = configureStore({
    reducer: {
        SelectCountry: SelectCountrySlice,
        SelectedCurrency: SelectedCurrencySlice
    }
})