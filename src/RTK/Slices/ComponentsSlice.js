import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    isShown: false,
    searchComponent: false,
    SearchBarComponent: false
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
            // console.log("From hiding");
            // console.log("hideSearchComponent");
            state.searchComponent = false;
        },
        TriggerSearchBarComponent: state => {
            state.SearchBarComponent = !state.SearchBarComponent;
        }
    }
})

export const { showComponents, hideComponents, showSearchComponent, hideSearchComponent, TriggerSearchBarComponent } = ComponentsSlice.actions;
export default ComponentsSlice.reducer;