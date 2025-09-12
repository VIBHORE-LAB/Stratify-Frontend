import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { runStrategy, RunStrategyPayload } from "../../api/strategyService";
import axios from "axios";
import { normalizeTrade, normalizeTrades } from "../../Helpers/normalizeTrades";
import { StrategyResult, Trade } from "../../types";

// --- State ---
interface StrategyState {
  results: StrategyResult[];
  currentResult: StrategyResult | null;
  loading: boolean;
  error: string | null;
}

const initialState: StrategyState = {
  results: [],
  currentResult: null,
  loading: false,
  error: null,
};

// --- Async Thunk ---
export const runStrategyThunk = createAsyncThunk<
  StrategyResult,
  RunStrategyPayload,
  { rejectValue: string }
>(
  "strategy/runStrategy",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await runStrategy(payload);
      // runStrategy might return AxiosResponse or the data directly.
      const data = (response as any)?.data ?? response;
      return data as StrategyResult;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(err, "err");
        return rejectWithValue(err.response?.data || "Unknown error");
      }
      return rejectWithValue("Unknown error");
    }
  }
);

// --- Slice ---
const strategySlice = createSlice({
  name: "strategy",
  initialState,
  reducers: {
    resetCurrentResult: (state, action: { payload?: { force: boolean } }) => {
      // Only reset if explicitly forced
      if (action.payload?.force) {
        state.currentResult = null;
      }
    },
    setLoading: (state, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
    addLiveTrade: (state, action: { payload: Trade | any }) => {
      if (state.currentResult) {
        state.currentResult.Trades = state.currentResult.Trades ?? [];
        const trade = normalizeTrade(action.payload);
        const exists = state.currentResult.Trades.some(
          (t) => t.orderId === trade.orderId && t.timestamp === trade.timestamp
        );
        if (!exists) {
          state.currentResult.Trades.push(trade);
          // Update sessionStorage after adding a trade
          sessionStorage.setItem("lastBacktest", JSON.stringify(state.currentResult));
        }
      }
    },
    markBacktestComplete: (state, action: { payload: StrategyResult }) => {
      // Preserve existing Trades if not provided in payload (e.g., if Trades were streamed separately)
      const trades = action.payload.Trades ?? state.currentResult?.Trades ?? [];
      const normalized: StrategyResult = {
        ...action.payload,
        Trades: normalizeTrades(trades),
      };
      // Replace if already exists
      state.results = state.results.filter((r) => r.id !== normalized.id);
      state.results.push(normalized);
      state.currentResult = normalized;
      state.loading = false;
    },
    markBacktestError: (state, action: { payload: string }) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runStrategyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(runStrategyThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Preserve existing Trades if not provided in payload (for consistency)
        const trades = action.payload?.Trades ?? state.currentResult?.Trades ?? [];
        state.currentResult = {
          ...action.payload,
          Trades: normalizeTrades(trades),
        } as StrategyResult;
      })
      .addCase(runStrategyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const {
  resetCurrentResult,
  setLoading,
  addLiveTrade,
  markBacktestComplete,
  markBacktestError,
} = strategySlice.actions;

export default strategySlice.reducer;