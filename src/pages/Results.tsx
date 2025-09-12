import { useEffect } from "react";
import { useResults } from "../hooks/useResult";

const Results = () => {
  const { loading, results, error, fetchResults } = useResults();

  useEffect(() => {
    fetchResults(10, 0);
  }, [fetchResults]);

  useEffect(() => {
    if (results.length) {
      console.log("Updated results:", results);
    }
  }, [results]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      <h1>Results Page</h1>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

export default Results;
