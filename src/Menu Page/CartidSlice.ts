import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface forobject {
    value: Object;
};

const initialState: forobject = {
    value: {},
};

const Cartidslice = createSlice({
    name: "Cartiddata",
    initialState,
    reducers: {
        cartId: (state, action: PayloadAction<Object>) => {
            state.value = action.payload;
        },
        clearCartId: (state) => {
            state.value = initialState.value;
        }
    },
});

export const {cartId, clearCartId} = Cartidslice.actions;
export default Cartidslice.reducer;