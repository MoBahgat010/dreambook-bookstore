import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    isShown: false,
    searchComponent: false
}

export const ComponentsSlice = createSlice({
    name: 'Components',
    initialState: initialstate,
    reducers: {
        showComponents: (state) => {
            state.isShown = true;
        },
        hideComponents: (state) => {
            state.isShown = false;
        },
        showSearchComponent: (state) => {
            // console.log("showSearchComponent");
            state.searchComponent = true;
        },
        hideSearchComponent: (state) => {
            // console.log("hideSearchComponent");
            state.searchComponent = false;
        }
    }
})

export const { showComponents, hideComponents, showSearchComponent, hideSearchComponent } = ComponentsSlice.actions;
export default ComponentsSlice.reducer;