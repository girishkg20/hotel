import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from "./slice";
import ReducerReducer from './reducer';


const store = configureStore({
    reducer: {
        VegFilterSlice: SliceReducer,
        enteredText: ReducerReducer
    }
})
export default store;