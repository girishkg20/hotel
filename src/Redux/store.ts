import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';


import SliceReducer from "./slice";
import ReducerReducer from './reducer';
import AdditemReducer from '../Menu Page/AdditemSlice'
import UserAddressSlice from "../Home Page/Home_Page_API/UserAddressSlice";
import Phnoslice from "../Login Page/Enter_Ph_No/PhNoSlice";
import AuthSlice from "../Login Page/Enter_Otp/AuthSlice";
import CartSlice from "../Menu Page/CartSlice";
import CartidSlice from "../Menu Page/CartidSlice";




const PersistConfig = {
    key: "root",
    storage,
}

const perReducers = combineReducers({
    saveaddress: UserAddressSlice,
    auth: AuthSlice,
    addItem: CartSlice,
    cartId: CartidSlice
})


const persistedReducer = persistReducer(PersistConfig, perReducers)

export const store = configureStore({
    reducer: {
        VegFilterSlice: SliceReducer,
        enteredText: ReducerReducer,
        AddRemoveItems: AdditemReducer,
        mobileNumber: Phnoslice,
        
        perReducers: persistedReducer,
    },
    middleware: [thunk],
})

export const persistor = persistStore(store);