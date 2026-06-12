import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
  error: null,
};

export const getAllOrderForAdmin = createAsyncThunk(
  "/admin/order/getAllOrderForAdmin",
  async () => {
    const res = await axios.get("http://localhost:5000/api/admin/orders/get");
    return res.data;
  },
);
export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/details/${id}`,
    );
    return response.data;
  },
);
export const updateOrderStatusForAdmin = createAsyncThunk(
  "/order/updateOrderStatusForAdmin",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/orders/update/${id}`,
      {
        orderStatus,
      },
    );
    return response.data;
  },
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrderForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrderForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrderForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })

      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(updateOrderStatusForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatusForAdmin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOrderStatusForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const { resetOrderState } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
