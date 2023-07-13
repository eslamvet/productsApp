import { configureStore } from "@reduxjs/toolkit";
import modelReducer from "./features/modelSlice";
import modelDetailSlice from "./features/modelDetailSlice";


const store = configureStore({
    reducer:{
        model:modelReducer,
        modelDetail:modelDetailSlice
    }
})

export type storeState = ReturnType<typeof store.getState> 
export type storeDispatch = typeof store.dispatch
export default store