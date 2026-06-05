import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    isLoading: false,
    error: null,
    addressList: [],
}

export const addAddress = createAsyncThunk(
    'address/addAddress',
    async (formData) => {
        const result = await axios.post(
            'http://localhost:5000/api/shop/address/add',formData
        )
        return result?.data;
    }
);


export const fetchAllAddress = createAsyncThunk(
    'address/fetchAllAddress',
    async (userId) => {
        const result = await axios.get(
            `http://localhost:5000/api/shop/address/get/${userId}`,{userId}
        )
        return result?.data;
    }
);

export const editAllAddress = createAsyncThunk(
    'address/editAllAddress',
    async ({ userId, addressId, formData }) => {
        const result = await axios.put(
            `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
            formData
        )
        return result?.data;
    }
);

export const deleteAllAddress = createAsyncThunk(
    'address/deleteAllAddress',
    async ({ userId, addressId }) => {
        const result = await axios.delete(
            `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`,{userId, addressId }
        )
        return result?.data;
    }
);


const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: [],
    extraReducers: (builder) => {
        builder
        .addCase(addAddress.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(addAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList.push(action.payload.data);
        })
        .addCase(addAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        .addCase(fetchAllAddress.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchAllAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action.payload.data;
        })
        .addCase(fetchAllAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})
export default addressSlice.reducer;