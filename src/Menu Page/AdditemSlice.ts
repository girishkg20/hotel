import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface forobject {
    value: object;
};

const initialState: forobject = {
    value: {},
}

const Addremoveitems = createSlice({
    name: 'AddRemoveItems',
    initialState,
    reducers: {
        additem: (state, action: PayloadAction<object>) => {
            state.value = action.payload
        },
        removeitem: (state, action: PayloadAction<object>) => {
            state.value = action.payload
        }
    },
})

export const {additem, removeitem} = Addremoveitems.actions
export default Addremoveitems.reducer