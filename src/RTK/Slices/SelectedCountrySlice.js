import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bahrain from "../../assets/bahrain.png"
import emirates from "../../assets/emirates.png"
import kuwait from "../../assets/kuwait.png"
import saudiarabia from "../../assets/saudiarabia.png"
import world from "../../assets/world.png"
import { FetchProducts } from "./FetchProductsSlice";
import { GetAllWishedProducts } from "./ProductsWishListSlice";
import { GetAllCartProducts } from "./ProductCartSlice";

const initialstate = {
    countryImg: kuwait,
    countryName: "Kuwait",
    countryCurrency: localStorage.getItem("currency") == null || localStorage.getItem("currency") ? "KWD" : localStorage.getItem("currency")
}

export const ChangeCountry = createAsyncThunk("SelectedCountrySlice/ChangeCountry", async (data, { dispatch, getState }) => {
    dispatch(changeCountry(data));
    await dispatch(FetchProducts());
    await dispatch(GetAllCartProducts());
    return await dispatch(GetAllWishedProducts());
})

export const ChangeCurrency = createAsyncThunk("SelectedCountrySlice/ChangeCurrency", async (data, { dispatch, getState }) => {
    dispatch(changeCurrency(data));
    await dispatch(FetchProducts());
    await dispatch(GetAllCartProducts());
    return await dispatch(GetAllWishedProducts());
})

export const SelectedCountrySlice = createSlice({
    name: "selectedCountry",
    initialState: initialstate,
    reducers: {
        changeCountry: (state, action) => {
            state.countryImg = action.payload.countryImg;
            state.countryName = action.payload.countryName;
            state.countryCurrency = action.payload.countryCurrency;
            localStorage.setItem("currency", state.countryCurrency);
        },
        changeCurrency: (state = initialstate, action) => {
            state.countryCurrency = action.payload;
            localStorage.setItem("currency", state.countryCurrency);
        }
    } 
})

export const { changeCountry, changeCurrency } = SelectedCountrySlice.actions;
export default SelectedCountrySlice.reducer;