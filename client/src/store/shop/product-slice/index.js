import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  productList: [],
  productdetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "products/fetchAllFilteredProducts",
  async ({ filterParams, sortParams, sortParam }) => {
    const params = {};
    const sortByValue = sortParams ?? sortParam;

    if (filterParams && typeof filterParams === "object") {
      Object.entries(filterParams).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          params[key] = value.join(",");
        } else if (typeof value === "string" && value.trim().length > 0) {
          params[key] = value;
        }
      });
    }

    if (sortByValue) {
      params.sortBy = sortByValue;
    }

    const query = new URLSearchParams(params).toString();
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`,
    );
    return result?.data;
  },
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`,
    );
    return result?.data;
  },
);

const shopPrdouctSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.productdetails = null;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        ((state.isLoading = false), (state.productList = action.payload.data));
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        ((state.isLoading = true), (state.productList = []));
      });

    builder
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productdetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productdetails = null;
      });
  },
});

export const { clearProductDetails } = shopPrdouctSlice.actions;

export default shopPrdouctSlice.reducer;


