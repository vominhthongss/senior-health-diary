import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FAILED, LOADING, SUCCEEDED } from "../../constants/store";
import api from "../../services/api";

const initialState = {
  savedSicks: undefined,
  status: "idle",
  error: null,
};

export const fetchSavedSicks = createAsyncThunk(
  "sickDetail/fetchSavedSicks",
  async () => {
    try {
      const response = await api.get("/savedSicks");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const saveSavedSicks = createAsyncThunk(
  "sickDetail/saveSavedSicks",
  async ({ usersId, sicksId }) => {
    try {
      const response = await api.post("/savedSicks", {
        usersId: usersId,
        sicksId: sicksId,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const unSaveSavedSicks = createAsyncThunk(
  "sickDetail/unSaveSavedSicks",
  async ({ id, usersId, sicksId }) => {
    try {
      const response = await api.delete(`/savedSicks/${id}`, {
        usersId: usersId,
        sicksId: sicksId,
      });

      if (response.data) {
        return { id };
      }
    } catch (error) {
      throw error;
    }
  }
);
const sickDetailSlice = createSlice({
  name: "sickDetail",
  initialState,
  reducers: {
    resetState: (state, action) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedSicks.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchSavedSicks.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.savedSicks = action.payload;
      })
      .addCase(fetchSavedSicks.rejected, (state, action) => {
        state.status = FAILED;
      })
      .addCase(saveSavedSicks.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(saveSavedSicks.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.savedSicks.push(action.payload);
      })
      .addCase(saveSavedSicks.rejected, (state, action) => {
        state.status = FAILED;
      })
      .addCase(unSaveSavedSicks.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(unSaveSavedSicks.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        const { id } = action.payload;
        state.savedSicks = state.savedSicks.filter((x) => x.id !== id);
      })
      .addCase(unSaveSavedSicks.rejected, (state, action) => {
        state.status = FAILED;
      });
  },
});

export const { resetState } = sickDetailSlice.actions;

export default sickDetailSlice.reducer;
