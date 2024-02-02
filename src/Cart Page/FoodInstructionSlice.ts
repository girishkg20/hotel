import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface forstring {
    value: string;
};

const initialState: forstring = {
    value: "",
};



const Foodinstructionslice = createSlice({
    name: 'FoodInstructionSlice',
    initialState,
    reducers: {
        foodinstruction: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    },
})

export const {foodinstruction} = Foodinstructionslice.actions
export default Foodinstructionslice.reducer;