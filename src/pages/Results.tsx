import { useEffect, useState, useRef } from "react";
import { Card } from "../components/ui/card";
import ResultPanel from "../components/Result";
import Loader from "../components/Loader";
import { useResults } from "../hooks/useResult";
import { Button } from "../components/ui/button";
import { Trade } from "../types";
import { useSonner } from "sonner";
const capitalize = (s?: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : "Unknown";

const formatCurrency = (n: number) =>
  `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const ResultsPage = () => {
  const {
    results,
    loading,
    error,
    fetchResults,
    fetchResultDetails,
    resultDetails,
  } = useResults();

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);
  const [openBelowId, setOpenBelowId] = useState<string | null>(null);

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const limit = 20;
  const offset = currentPage * limit;

  useEffect(() => {
    fetchResults(limit, offset);
  }, [fetchResults, limit, offset]);

  // Fetch details whenever user selects a result
  useEffect(() => {
    if (selectedResultId) {
      fetchResultDetails(selectedResultId);
    }
  }, [selectedResultId, fetchResultDetails]);

  const handleCardClick = (id: string) => {
    if (openBelowId === id) {
      // Toggle off if clicking the same card
      setOpenBelowId(null);
      setSelectedResultId(null);
    } else {
      setOpenBelowId(id);
      setSelectedResultId(id);
    }
  };

  if (loading) return <Loader message="Fetching results..." />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col space-y-6 p-6 bg-black text-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold text-green-400 text-center">
        Backtest Results
      </h1>

      {/* Cards */}
      <div className="space-y-6 max-w-5xl mx-auto w-full">
        {results.length === 0 && (
          <Card className="bg-[#0A0A0A] border border-gray-800 rounded-xl p-8 text-center">
            <p className="text-lg text-gray-300">
              No results yet — run your first backtest to see stats.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              You will see Final NAV, P&L, Trades and Win Rate here.
            </p>
          </Card>
        )}

        {results.map((bt) => {
          const finalNav = Number(bt.finalNav ?? 0);
          const startingNav = Number(bt.startingNav ?? 0);
          const pnlValue = finalNav - startingNav;
          const pctChange = Number(bt.pctChange ?? 0);
          const isProfit = pctChange >= 0;
          const winRate = bt.winRate != null ? Number(bt.winRate) : null;

          return (
            <div key={bt.id} ref={(el) => (cardRefs.current[bt.id] = el)}>
              <Card
                onClick={() => handleCardClick(bt.id)}
                className="bg-[#0A0A0A] border border-gray-800 hover:border-green-700 transition-colors cursor-pointer rounded-xl p-6 relative"
              >
                <div className="flex items-center gap-6">
                  <div className="w-64 flex-shrink-0">
                    <h2 className="text-xl font-semibold text-white">
                      {capitalize(bt.Strategy?.name)}
                    </h2>
                    <div className="flex items-center text-gray-400 space-x-3 text-sm mt-2">
                      <span className="inline-flex items-center gap-2">
                        <svg
                          className="w-4 h-4 opacity-80"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M3 3v18h18"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21 21l-6-6"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{bt.ticker ?? "N/A"}</span>
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <svg
                          className="w-4 h-4 opacity-80"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M7 11h10M7 7h10M7 15h10"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>
                          {bt.startDate && bt.endDate
                            ? `${bt.startDate} to ${bt.endDate}`
                            : bt.createdAt
                            ? new Date(bt.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 justify-between">
                    <div className="w-40">
                      <p className="text-gray-400 text-sm">Final NAV</p>
                      <p className="text-lg font-bold text-white mt-1">
                        {formatCurrency(finalNav)}
                      </p>
                    </div>

                    <div className="w-40">
                      <p className="text-gray-400 text-sm">P&L</p>
                      <p
                        className={`text-lg font-bold mt-1 ${
                          pnlValue >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {pnlValue >= 0 ? "+" : ""}
                        {formatCurrency(Math.abs(pnlValue))}
                      </p>
                    </div>

                    <div className="w-40">
                      <p className="text-gray-400 text-sm">Win Rate</p>
                      <p className="text-lg font-bold text-white mt-1">
                        {winRate != null ? `${winRate.toFixed(1)}%` : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-4">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isProfit
                          ? "bg-green-600/20 text-green-400"
                          : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {pctChange.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </Card>

              {/* ResultPanel below this card */}
              {openBelowId === bt.id && resultDetails && selectedResultId === bt.id && (
                <div className="mt-4 max-w-5xl mx-auto w-full">
                  <ResultPanel
                    result={{
                      ...resultDetails,
                      finalNav: String(resultDetails.finalNav),
                      startingNav: String(resultDetails.startingNav),
                      Strategy: {
                        ...(resultDetails.Strategy || {}),
                        params:
                          typeof resultDetails.Strategy?.params === "string"
                            ? JSON.parse(resultDetails.Strategy.params)
                            : resultDetails.Strategy?.params || {},
                      },
                      Trades:
                        resultDetails.Trades?.map((trade: Trade) => ({
                          ...trade,
                          nav: trade.nav != null ? Number(trade.nav) : undefined,
                        })) || [],
                    }}
                    connectionStatus="connected"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="bg-gray-800 hover:bg-green-700"
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="bg-gray-800 hover:bg-green-700"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
