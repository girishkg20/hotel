import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface forobject {
    value: Object;
};

const initialState: forobject = {
    value: {},
};

const Useraddressslice = createSlice({
    name: 'User-Address',
    initialState,
    reducers: {
        saveaddress: (state, action: PayloadAction<object>) => {
            state.value = action.payload
        }
    },
})

export const {saveaddress} = Useraddressslice.actions;
export default Useraddressslice.reducer;