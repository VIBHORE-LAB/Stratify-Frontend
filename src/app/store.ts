import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
// import backtesterReducer from "../features/backtester/backtesterSlice";
import resultReducer from "../features/results/resultSlice";

export const  store = configureStore({
    reducer:{
        auth: authReducer,
        // backtester: backtesterReducer,
        result: resultReducer,
    }
})



export type RootState = ReturnType<typeof  store.getState>;
export type AppDispatch = typeof store.dispatch;


