import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import backtesterReducer from "../features/strategy/backtestSlice";
import resultReducer from "../features/results/resultSlice";
import tickerReducer from "../features/Tickers/tickerSlice"
export const  store = configureStore({
    reducer:{
        auth: authReducer,
        backtester: backtesterReducer,
        result: resultReducer,
        tickers: tickerReducer,
    }
})



export type RootState = ReturnType<typeof  store.getState>;
export type AppDispatch = typeof store.dispatch;


