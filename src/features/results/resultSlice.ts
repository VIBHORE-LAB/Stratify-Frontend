import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchResultsHistory,
  getCount,
  fetchAverageWinRate,
  fetchResultDetails,
} from "../../api/resultService";
import { AxiosError } from "axios";
import { StrategyResult, Trade } from "../../types";

interface ResultsState {
  results: StrategyResult[];
  loading: boolean;
  error: string | null;
  averageWinRate?: number;
  bestStrategy?: string;
  resultDetails?: StrategyResult | null; 
}

export const resultThunk = createAsyncThunk(
  "results/fetchHistory",
  async ({ limit, offset }: { limit?: number; offset?: number }, { rejectWithValue }) => {
    try {
      const response = await fetchResultsHistory(limit, offset);
      return response.rows;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch results history"
      );
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

export const averageWinRateThunk = createAsyncThunk(
  "results/fetchAverageWinRate",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAverageWinRate();
      return {
        averageWinRate: response.averageWinRate,
        bestStrategy: response.bestStrategy,
      };
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch average win rate"
      );
    }
  }
);

// 👇 New thunk for fetching result details
export const resultDetailsThunk = createAsyncThunk(
  "results/fetchResultDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchResultDetails(id);
      return response.data; // this should be a single StrategyResult
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch result details"
      );
    }
  }
);

const initialState: ResultsState = {
  results: [],
  loading: false,
  error: null,
  averageWinRate: undefined,
  bestStrategy: undefined,
  resultDetails: null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- History ---
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
        state.error = (action.payload as string) || "Unknown error";
      })

      // --- Average Win Rate ---
      .addCase(averageWinRateThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(averageWinRateThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.averageWinRate = action.payload.averageWinRate;
        state.bestStrategy = action.payload.bestStrategy;
      })
      .addCase(averageWinRateThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Unknown error";
      })

      // --- Result Details ---
      .addCase(resultDetailsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resultDetails = null;
      })
      .addCase(resultDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.resultDetails = action.payload;
      })
      .addCase(resultDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Unknown error";
        state.resultDetails = null;
      });
  },
});

export default resultsSlice.reducer;
