import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    cartItems: [],
    cartId: null,
}

export const addToCart =  createAsyncThunk(
    "shopCart/addToCart",
    async({userId, productId, quantity}) => {
        const result = await axios.post("http://localhost:5000/api/shop/cart/add", {
            userId,
            productId,
            quantity,
        });
        return result?.data;
    }
);

export const fetchCartItems = createAsyncThunk(
    "shopCart/fetchCartItems",
    async({userId})=> {
        const result = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`, {userId})
        return result?.data;
    }
);

export const updateCartItemQuantity = createAsyncThunk(
    "shopCart/updateCartItemQuantity",
    async({userId, productId, quantity}) => {
        const result = await axios.put("http://localhost:5000/api/shop/cart/update", {
            userId,
            productId,
            quantity,
        });
        return result?.data;
    }
);

export const deleteCartItem = createAsyncThunk(
    "shopCart/deleteCartItem",
    async({userId, productId}) => {
        const result = await axios.delete(`http://localhost:5000/api/shop/cart/delete/${userId}/${productId}`);
        return result?.data;
    }
);


const shopCartSlice = createSlice({
    name: "shopCart",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
builder
.addCase(addToCart.pending, (state, action) => {
    state.isLoading = true;
})
.addCase(addToCart.fulfilled, (state, action) => {
    state.isLoading = false;
    state.cartItems = action.payload.data.items;
    state.cartId = action.payload.data._id;
})
.addCase(addToCart.rejected, (state, action) => {
    state.isLoading = true;
    state.cartItems = [];
    state.cartId = null;
})


.addCase(fetchCartItems.pending, (state, action) => {
    state.isLoading = true;
})
.addCase(fetchCartItems.fulfilled, (state, action) => {
    state.isLoading = false;
    state.cartItems = action.payload.data.items;
    state.cartId = action.payload.data._id;
})
.addCase(fetchCartItems.rejected, (state, action) => {
    state.isLoading = true;
    state.cartItems = [];
    state.cartId = null;
})


.addCase(updateCartItemQuantity.pending, (state, action) => {
    state.isLoading = true;
})
.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
    state.isLoading = false;
    state.cartItems = action.payload.data.items;
    state.cartId = action.payload.data._id;
})
.addCase(updateCartItemQuantity.rejected, (state, action) => {
    state.isLoading = true;
    state.cartItems = [];
    state.cartId = null;
})


.addCase(deleteCartItem.pending, (state, action) => {
    state.isLoading = true;
})
.addCase(deleteCartItem.fulfilled, (state, action) => {
    state.isLoading = false;
    state.cartItems = action.payload.data.items;
    state.cartId = action.payload.data._id;
})
.addCase(deleteCartItem.rejected, (state, action) => {
    state.isLoading = true;
    state.cartItems = [];   
    state.cartId = null;
})

    }});
    export default shopCartSlice.reducer;
