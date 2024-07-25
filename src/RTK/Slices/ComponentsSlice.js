import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    isShown: false
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
        }
    }
})

export const { showComponents, hideComponents } = ComponentsSlice.actions;
export default ComponentsSlice.reducer;