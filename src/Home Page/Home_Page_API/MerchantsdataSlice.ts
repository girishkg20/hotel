import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface forobject {
    value: Object;
};

const initialState: forobject = {
    value: {},
};

const Merchantsdataslice = createSlice({
    name: 'Merchants-Data',
    initialState,
    reducers: {
        merchantsData: (state, action: PayloadAction<object>) => {
            state.value = action.payload
        },
        clearmerchantsData: (state) => {
            state.value = initialState.value
        }
    },
})

export const {merchantsData, clearmerchantsData} = Merchantsdataslice.actions;
export default Merchantsdataslice.reducer;