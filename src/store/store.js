import { configureStore } from "@reduxjs/toolkit";
import TransactionReducer from "./transaction"

export const store=configureStore({
    reducer:{
        Transaction:TransactionReducer,
    }
})