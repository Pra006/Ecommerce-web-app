import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImage = createAsyncThunk(
  "/shop/getFeatureImage",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/common/feature/get`,
    );
    return response.data.data;
  },
);
export const addFeatureImage = createAsyncThunk(
  "/shop/addtFeatureImage",
  async (image) => {
    const response = await axios.post(
      `http://localhost:5000/api/common/feature/add`,
      { image },
    );
    return response.data.data;
  },
);
export const deleteFeatureImage = createAsyncThunk(
  "/shop/deleteFeatureImage",
  async (featureImageId) => {
    const response = await axios.delete(
      `http://localhost:5000/api/common/feature/delete/${featureImageId}`,
    );
    return response.data;
  },
);
const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload;
      })
      .addCase(getFeatureImage.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      .addCase(deleteFeatureImage.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});
export default commonSlice.reducer;
