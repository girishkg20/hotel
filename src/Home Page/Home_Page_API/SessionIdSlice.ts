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
        }
    },
})

export const {sessionid} = Sessionidslice.actions
export default Sessionidslice.reducer;