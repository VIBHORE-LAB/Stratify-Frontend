import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResultsHistory, getCount } from "../../api/resultService";
import { AxiosError } from "axios";
import { StrategyResult } from "../../types";

interface ResultsState {
  results: StrategyResult[];
  loading: boolean;
  error: string | null;
}
export const resultThunk = createAsyncThunk(
  "results/fetchHistory",
  async ({ limit, offset }: { limit?: number; offset?: number }, { rejectWithValue }) => {
    try {
      const response = await fetchResultsHistory(limit, offset);
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch results history");
    }
  }
);


export const countThunk = createAsyncThunk(
  "results/getcount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCount();
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch Count");
    }
  }
);


const initialState: ResultsState = {
  results: [],
  loading: false,
  error: null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resultThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resultThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(resultThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Unknown error";
      });
  },
});

export default resultsSlice.reducer;
