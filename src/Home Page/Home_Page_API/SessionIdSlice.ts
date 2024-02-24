import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface forstring {
    value: string;
};

const initialState: forstring = {
    value: "",
};



const Sessionidslice = createSlice({
    name: 'SessionIdSlice',
    initialState,
    reducers: {
        sessionid: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
        clearsessionid: (state) => {
            state.value = initialState.value
        }
    },
})

export const {sessionid, clearsessionid} = Sessionidslice.actions;
export default Sessionidslice.reducer;