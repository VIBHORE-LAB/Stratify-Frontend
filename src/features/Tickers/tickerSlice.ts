import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTickers } from "../../api/tickerService";
import { AxiosError } from "axios";
import { Ticker, TickerState } from "../../types";

export const tickerThunk = createAsyncThunk<Ticker[], void, { rejectValue: string }>(
  "tickers/getTickers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTickers();
      console.log("here", response.data);
      return response as Ticker[]; 
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch tickers");
    }
  }
);

const initialState: TickerState = {
  tickers: [],
  loading: false,
  error: null,
};

const tickerSlice = createSlice({
  name: "tickers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tickerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(tickerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tickers = action.payload;
      })
      .addCase(tickerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export default tickerSlice.reducer;
