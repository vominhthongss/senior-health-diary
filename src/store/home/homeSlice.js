import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FAILED, LOADING, SUCCEEDED } from "../../constants/store";
import api from "../../services/api";

const initialState = {
  catagories: undefined,
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "home/fetchCategories",
  async () => {
    try {
      const response = await api.get(
        `/index.php?route=extension/mstore/category`
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);
export const searchCategories = createAsyncThunk(
  "home/searchCategories",
  async ({ keyword }) => {
    try {
      const response = await api.get(
        `/index.php?route=extension/mstore/category?name=${keyword}`
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchCategories.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = FAILED;
      })
      .addCase(searchCategories.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(searchCategories.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.categories = action.payload;
      })
      .addCase(searchCategories.rejected, (state, action) => {
        state.status = FAILED;
      });
  },
});

export const {} = homeSlice.actions;

export default homeSlice.reducer;
