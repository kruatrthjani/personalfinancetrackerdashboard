import { createSlice } from "@reduxjs/toolkit";

const Transactionslice=createSlice({
    name:"transaction",
    initialState:{
        payment:[],
    },
    reducers:{
        deletePayment(state,action){
            const {id}=action.payload;            
            state.payment=state.payment.filter((pay)=>pay.id!==id)
        },
        insertPayment(state,action){
            const {newTransaction}=action.payload;
            state.payment.push(newTransaction)
        },
        updatePayment(state, action) {
            const { id, data } = action.payload;
            const paymentToUpdate = state.payment.find((pay) => pay.id === id);
            
            if (paymentToUpdate) {
                // Update the existing object's properties directly
                Object.assign(paymentToUpdate, data);
            }
        }
        
    }
})
export const {deletePayment,insertPayment,updatePayment} = Transactionslice.actions;
export default Transactionslice.reducer;
