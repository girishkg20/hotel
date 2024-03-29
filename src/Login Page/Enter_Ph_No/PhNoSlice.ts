import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface forstring {
    value: String;
};

const initialState: forstring = {
    value: "",
};

const Phnoslice = createSlice({
    name: "Mobile-Number",
    initialState,
    reducers: {
        mobileNumber: (state, action: PayloadAction<String>) => {
            state.value = action.payload
        },
        clearmobileNumber: (state) => {
            state.value = initialState.value
        }
    },
});

export const {mobileNumber, clearmobileNumber} = Phnoslice.actions;
export default Phnoslice.reducer;