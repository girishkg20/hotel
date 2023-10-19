import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface forobject {
    value: Object;
};

const initialState: forobject = {
    value: {},
};

const Authslice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        auth: (state, action: PayloadAction<Object>) => {
            state.value = action.payload
        }
    },
});

export const {auth} = Authslice.actions;
export default Authslice.reducer;