import { useAppDispatch, useAppSelector } from "../app/hooks";
import { resultThunk, averageWinRateThunk } from "../features/results/resultSlice";
import { useCallback } from "react"; 

export function useResults() {
  const dispatch = useAppDispatch();
  const { results, loading, error, averageWinRate, bestStrategy } = useAppSelector(
    (state) => state.result
  );

  const fetchResults = useCallback(
    (limit?: number, offset?: number) => {
      dispatch(resultThunk({ limit, offset }));
    },
    [dispatch]
  );

  const fetchAverageWinRate = useCallback(() => {
    dispatch(averageWinRateThunk());
  }, [dispatch]);

  return { results, loading, error, averageWinRate, bestStrategy, fetchResults, fetchAverageWinRate };
}
