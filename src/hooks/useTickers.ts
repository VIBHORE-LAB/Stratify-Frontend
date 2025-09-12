import { useAppDispatch, useAppSelector } from "../app/hooks";

import { tickerThunk } from "../features/Tickers/tickerSlice";
import { useCallback } from "react";

export function useTickers() {
  const dispatch = useAppDispatch();
  const { tickers, loading, error } = useAppSelector((state) => state.tickers);

  const fetchTickers = useCallback(() => {
    dispatch(tickerThunk());
  }, [dispatch]);

  return { tickers, loading, error, fetchTickers };
}
