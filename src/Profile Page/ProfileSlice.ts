import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface forobject {
    value: object;
};

const initialState: forobject = {
    value: {},
};



const Profileslice = createSlice({
    name: 'ProfileSlice',
    initialState,
    reducers: {
        profiledata: (state, action: PayloadAction<object>) => {
            state.value = action.payload
        },
        clearprofiledata: (state) => {
            state.value = initialState.value
        }
    },
})

export const {profiledata, clearprofiledata} = Profileslice.actions;
export default Profileslice.reducer;