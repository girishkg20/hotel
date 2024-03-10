import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface forstring {
    value: Object;
};

const initialState: forstring = {
    value: {
        searchkey: "",
        searchtab: "",
        searchscrollposition: 0
    },
};



const Searchdataslice = createSlice({
    name: 'SearchDataSlice',
    initialState,
    reducers: {
        searchdatapositions: (state, action: PayloadAction<Object>) => {
            state.value = action.payload;
        },
        clearsearchdatapositions: (state) => {
            state.value = initialState.value;
        }
    },
})

export const {searchdatapositions, clearsearchdatapositions} = Searchdataslice.actions
export default Searchdataslice.reducer;