import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface forstring {
    value: string;
};

const initialState: forstring = {
    value: "",
};



const Roomnumberslice = createSlice({
    name: 'RoomNumberSlice',
    initialState,
    reducers: {
        roomnumber: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
        clearroomnumber: (state) => {
            state.value = initialState.value
        }
    },
})

export const {roomnumber, clearroomnumber} = Roomnumberslice.actions;
export default Roomnumberslice.reducer;