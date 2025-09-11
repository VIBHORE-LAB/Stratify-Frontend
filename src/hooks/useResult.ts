import { useAppDispatch, useAppSelector } from "../app/hooks";
import { resultThunk } from "../features/results/resultSlice";
import { useCallback } from "react"; 
export function useResults() {
  const dispatch = useAppDispatch();
  const { results, loading, error } = useAppSelector((state) => state.result);

  const fetchResults = useCallback(
    (limit?: number, offset?: number) => {
      dispatch(resultThunk({ limit, offset }));
    },
    [dispatch]
  );

  return { results, loading, error, fetchResults };
}
