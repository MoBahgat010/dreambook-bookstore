import { createSlice } from "@reduxjs/toolkit";
import bahrain from "../../assets/bahrain.png"
import emirates from "../../assets/emirates.png"
import kuwait from "../../assets/kuwait.png"
import saudiarabia from "../../assets/saudiarabia.png"
import world from "../../assets/world.png"

const initialstate = {
    countryImg: bahrain,
    countryName: "Bahrain",
}

export const SelectedCountrySlice = createSlice({
    name: "selectedCountry",
    initialState: initialstate,
    reducers: {
        changeCountry: (state, action) => {
            state.countryImg = action.payload.countryImg;
            state.countryName = action.payload.countryName;
        }
    } 
})

export const { changeCountry } = SelectedCountrySlice.actions;
export default SelectedCountrySlice.reducer;