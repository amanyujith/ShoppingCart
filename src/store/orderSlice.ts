import { createSlice } from "@reduxjs/toolkit";

interface orderData{
    user:string
    name:string
    address:string
    phoneNumber:number
    pincode:number
}
interface orderList {
  
   order:orderData[]
}
const initialState:orderList={
    order:[]
}

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        addOrderData(state,action){
            const {user,name,address,phoneNumber,pincode}= action.payload;
            
            state.order.push({user,name,address,phoneNumber,pincode})
        },
        deleteOrderData(state){
            state.order=[];
        }
    }
});

export const {addOrderData,deleteOrderData} =orderSlice.actions;
export default orderSlice.reducer;