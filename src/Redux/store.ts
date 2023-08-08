import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from "./slice";
import ReducerReducer from './reducer';
import AdditemReducer from '../Menu Page/AdditemSlice'


const store = configureStore({
    reducer: {
        VegFilterSlice: SliceReducer,
        enteredText: ReducerReducer,
        AddRemoveItems: AdditemReducer
    }
})
export default store;