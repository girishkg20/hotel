import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface forobject {
    value: Object;
};

const initialState: forobject = {
    value: {},
};

const Cartslice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Object>) => {
            state.value = action.payload;
        },
        clearItem: (state) => {
            state.value = initialState.value;
        }
    },
});

export const {addItem, clearItem} = Cartslice.actions;
export default Cartslice.reducer;