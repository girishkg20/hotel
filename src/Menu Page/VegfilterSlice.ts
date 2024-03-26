import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface forboolean {
    value: boolean;
};

const initialState: forboolean = {
    value: false,
};



const Slice = createSlice({
    name: 'VegFilterSlice',
    initialState,
    reducers: {
        selectvegfilter: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
        },
        clearselectvegfilter: (state) => {
            state.value = initialState.value
        }
    },
})

export const {selectvegfilter, clearselectvegfilter} = Slice.actions
export default Slice.reducer