import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import thunk from 'redux-thunk';

import VegfilterSlice from "../Menu Page/VegfilterSlice";
import UserAddressSlice from "../Home Page/Home_Page_API/UserAddressSlice";
import Phnoslice from "../Login Page/Enter_Ph_No/PhNoSlice";
import AuthSlice from "../Login Page/Enter_Otp/AuthSlice";
import CartSlice from "../Menu Page/CartSlice";
import CartidSlice from "../Menu Page/CartidSlice";
import FoodInstructionSlice from "../Cart Page/FoodInstructionSlice";
import SessionIdSlice from "../Home Page/Home_Page_API/SessionIdSlice";
import MerchantsdataSlice from "../Home Page/Home_Page_API/MerchantsdataSlice";
import SearchDataSlice from "../Search Page/SearchDataSlice";


const PersistConfig = {
    key: "root",
    storage,
}

const SessionConfig = {
    key: "session-root",
    storage: sessionStorage,
}

const perReducers = combineReducers({
    saveaddress: UserAddressSlice,
    auth: AuthSlice,
    addItem: CartSlice,
    cartId: CartidSlice,
    merchantsData: MerchantsdataSlice
})

const sesReducers = combineReducers({
    sessionid: SessionIdSlice
})

const persistedReducer = persistReducer(PersistConfig, perReducers);
const sessionReducers = persistReducer(SessionConfig, sesReducers);

export const store = configureStore({
    reducer: {
        VegFilterSlice: VegfilterSlice,
        mobileNumber: Phnoslice,
        foodinstruction: FoodInstructionSlice,
        searchdatapositions: SearchDataSlice,
        
        perReducers: persistedReducer,
        sesReducers: sessionReducers,
    },
    middleware: [thunk],
})

export const persistor = persistStore(store);