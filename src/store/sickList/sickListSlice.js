import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FAILED, LOADING, SUCCEEDED } from "../../constants/store";
import api from "../../services/api";

const initialState = {
  sicks: undefined,
  sick: undefined,
  status: "idle",
  error: null,
};

export const fetchSicks = createAsyncThunk("sickList/fetchSicks", async () => {
  try {
    const response = await api.get(`/index.php?route=api/product`);
    return response.data.products;
  } catch (error) {
    throw error;
  }
});
export const searchSicks = createAsyncThunk(
  "sickList/searchSicks",
  async ({ keyword }) => {
    try {
      const response = await api.get(
        `/index.php?route=extension/mstore/product?name=${keyword}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const sickListSlice = createSlice({
  name: "sickList",
  initialState,
  reducers: {
    setSick: (state, action) => {
      const { sick } = action.payload;
      state.sick = sick;
    },
    updateSickList: (state, action) => {
      const { sickList } = action.payload;
      state.sicks = sickList;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchSicks.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchSicks.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.sicks = action.payload;
      })
      .addCase(fetchSicks.rejected, (state, action) => {
        state.status = FAILED;
      })
      .addCase(searchSicks.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(searchSicks.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.sicks = action.payload;
      })
      .addCase(searchSicks.rejected, (state, action) => {
        state.status = FAILED;
      });
  },
});

export const { setSick, updateSickList } = sickListSlice.actions;

export default sickListSlice.reducer;
