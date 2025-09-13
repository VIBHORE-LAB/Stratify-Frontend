import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  resultThunk,
  averageWinRateThunk,
  resultDetailsThunk,
} from "../features/results/resultSlice";
import { useCallback } from "react";

export function useResults() {
  const dispatch = useAppDispatch();
  const {
    results,
    loading,
    error,
    averageWinRate,
    bestStrategy,
    resultDetails,
  } = useAppSelector((state) => state.result);

  // fetch all results history
  const fetchResults = useCallback(
    (limit?: number, offset?: number) => {
      dispatch(resultThunk({ limit, offset }));
    },
    [dispatch]
  );

  const fetchAverageWinRate = useCallback(() => {
    dispatch(averageWinRateThunk());
  }, [dispatch]);

  const fetchResultDetails = useCallback(
    (id: string) => {
      dispatch(resultDetailsThunk(id));
    },
    [dispatch]
  );

  return {
    results,
    loading,
    error,
    averageWinRate,
    bestStrategy,
    resultDetails,
    fetchResults,
    fetchAverageWinRate,
    fetchResultDetails,
  };
}
