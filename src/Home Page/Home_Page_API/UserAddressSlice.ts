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
        },
        clearsaveaddress: (state) => {
            state.value = initialState.value
        }
    },
})

export const {saveaddress, clearsaveaddress} = Useraddressslice.actions;
export default Useraddressslice.reducer;