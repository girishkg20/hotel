import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit"


export interface texttype {
    value: string
    // action: AnyAction
}

const initialState: texttype = {
    value: '',
    // action:
}

const textSlice = createSlice({
    name: 'enteredText',
    initialState,
    reducers: {
        textEntered: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
    },
})

export const {textEntered} = textSlice.actions
export default textSlice.reducer

// console.log(textSlice.actions.textEntered("df"));
