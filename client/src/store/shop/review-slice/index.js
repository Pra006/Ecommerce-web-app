import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
  error: "",
};

export const addReview = createAsyncThunk(
  "/order/addReview",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/shop/review/add`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);
export const getReview = createAsyncThunk(
  "/order/getReview",
  async (productId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/review/${productId}`,
    );
    return response.data;
  },
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});
export default reviewSlice.reducer;
