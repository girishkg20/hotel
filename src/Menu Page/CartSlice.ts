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
            state.value = action.payload
        },
        removeItem: (state, action: PayloadAction<Object>) => {
            state.value = action.payload
        }
    },
});

export const {addItem, removeItem} = Cartslice.actions;
export default Cartslice.reducer;