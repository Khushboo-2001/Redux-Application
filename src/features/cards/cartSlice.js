import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from '../../cartItems'
import { act } from "react-dom/test-utils";

const url ="https://course-api.com/react-useReducer-cart-project";

const initialState = {
    cartItems : [],
    amount : 3,
    total : 0,
    isLoading : true,
};

export const getCardItems = createAsyncThunk('cart/getCartItems',()=>{
    return fetch(url)
    .then((resp)=>resp.json())
    .catch((err)=>console.log(err));
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        clearCart: (state)=>{
            state.cartItems=[];
        },
        removeItem: (state,action)=>{
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item)=>
            item.id !== itemId);
        },
        increase: (state,{payload})=>{
            const cartItem=state.cartItems.find((item)=>item.id === payload.id)
            cartItem.amount=cartItem.amount+1;
        },
        decrease: (state,{payload})=>{
            const cartItem=state.cartItems.find((item)=>item.id === payload.id)
            cartItem.amount=cartItem.amount-1;
        },
        claculateTotal: (state)=>{
            let amount=0;
            let total =0;
            state.cartItems.forEach((item)=>{
                amount +=item.amount;
                total +=item.amount * item.price;
            });
            state.amount=amount;
            state.total=total;
        }
    },

    extraReducers:{
        [getCardItems.pending]:(state)=>{
            state.isLoading=true
          
        },
        [getCardItems.fulfilled]:(state,action)=>{
            console.log(action);
            state.isLoading=false;
            state.cartItems=action.payload;
        },
        [getCardItems.rejected]:(state)=>{
            state.isLoading=false;
          
        },
    }
});

export const {clearCart, removeItem, increase, decrease, claculateTotal} = cartSlice.actions;
export default cartSlice.reducer;
