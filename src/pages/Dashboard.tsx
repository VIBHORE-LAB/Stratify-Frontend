import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  DollarSign,
  BarChart3,
  Play,
  Target,
  TrendingUp,
} from "lucide-react";
import { CardSummary } from "../components/CardSummary";
import { StrategyResult } from "../types";
import { useNavigate } from "react-router-dom";
import { fetchResultsHistory, getCount } from "../api/resultService";
import { useResults } from "../hooks/useResult";
import Loader from "../components/Loader";

interface ResultState {
  results: StrategyResult[];
  loading: boolean;
  error: string | null;
}

interface CountState {
  count: number;
  loading: boolean;
  error: string | null;
}

const DashboardPage = () => {
  const [resultState, setResultState] = useState<ResultState>({
    results: [],
    loading: false,
    error: null,
  });

  const [countState, setCountState] = useState<CountState>({
    count: 0,
    loading: false,
    error: null,
  });

  const { averageWinRate, fetchAverageWinRate, bestStrategy } = useResults();

  useEffect(() => {
    fetchAverageWinRate();
  }, [fetchAverageWinRate]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadResults = async () => {
      setResultState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const data = await fetchResultsHistory(5, 0);
        setResultState((prev) => ({ ...prev, results: data.rows }));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setResultState((prev) => ({ ...prev, error: err.message }));
        } else {
          setResultState((prev) => ({
            ...prev,
            error: "Failed to fetch results",
          }));
        }
      } finally {
        setResultState((prev) => ({ ...prev, loading: false }));
      }
    };

    loadResults();
  }, []);

  useEffect(() => {
    const loadCount = async () => {
      setCountState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const data = await getCount();
        setCountState((prev) => ({ ...prev, count: data.totalBacktests }));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setCountState((prev) => ({ ...prev, error: err.message }));
        } else {
          setCountState((prev) => ({
            ...prev,
            error: "Failed to fetch count",
          }));
        }
      } finally {
        setCountState((prev) => ({ ...prev, loading: false }));
      }
    };
    loadCount();
  }, []);

  return (
    <div className="flex-1 p-6 space-y-8 bg-black text-gray-200 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-400">
            Monitor your backtesting performance and strategies
          </p>
        </div>
        <Button
          onClick={() => navigate("/backtest")}
          className="flex items-center space-x-2 bg-green-600 text-white hover:bg-green-700"
        >
          <Play className="h-4 w-4" />
          <span>New Backtest</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {countState.loading || resultState.loading ? (
          // Loader while APIs are fetching
          <div className="col-span-3 flex justify-center items-center py-12">
            <Loader />
          </div>
        ) : countState.count < 2 ? (
          // First backtest card
          <Card className="bg-[#0A0A0A] border border-gray-800 text-center p-8 col-span-3">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-400">
                Run your first backtest to get statistics 🚀
              </CardTitle>
              <CardDescription className="text-gray-400 mt-2">
                Once you run more backtests, your dashboard will display win
                rates, strategies, and performance insights here.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          // Summary cards
          <>
            <Card className="bg-[#0A0A0A] border border-gray-800 hover:border-green-500 transition-colors group">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-green-500" />
                  Total Backtests
                </CardTitle>
                <div className="text-3xl font-bold text-white group-hover:text-green-400 transition-colors">
                  {countState.count}
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-[#0A0A0A] border border-gray-800 hover:border-green-500 transition-colors group">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <Target className="h-4 w-4 mr-2 text-green-500" />
                  Average Win Rate
                </CardTitle>
                <div className="text-3xl font-bold text-white group-hover:text-green-400 transition-colors">
                  {averageWinRate?.toFixed(1)}%
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-[#0A0A0A] border border-gray-800 hover:border-green-500 transition-colors group">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                  Best Strategy
                </CardTitle>
                <div className="text-3xl font-bold text-white group-hover:text-green-400 transition-colors">
                  {bestStrategy
                    ? bestStrategy.charAt(0).toUpperCase() +
                      bestStrategy.slice(1)
                    : "N/A"}
                </div>
              </CardHeader>
            </Card>
          </>
        )}
      </div>

      {/* Recent Backtests */}
      {!(countState.loading || resultState.loading) && countState.count >= 2 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-green-400">
              Recent Backtests
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Data</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resultState.results.map((bt, idx) => {
              const finalNav = Number(bt.finalNav ?? 0);
              const pctChange = Number(bt.pctChange ?? 0);
              const isProfit = pctChange >= 0;

              return (
                <Card
                  key={bt.id}
                  className="bg-[#0A0A0A] border border-gray-800 hover:border-green-700 transition-colors group animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-white">
                      {bt.Strategy?.name
                        ? bt.Strategy.name.charAt(0).toUpperCase() +
                          bt.Strategy.name.slice(1)
                        : "Unknown"}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {bt.createdAt
                        ? new Date(bt.createdAt).toLocaleDateString()
                        : "N/A"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <CardSummary
                      title="Final NAV"
                      value={`$${finalNav.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}`}
                      icon={<DollarSign className="h-4 w-4 text-green-500" />}
                    />
                    <CardSummary
                      title="P&L"
                      value={`${pctChange.toFixed(2)}%`}
                      icon={
                        <BarChart3
                          className={`h-4 w-4 ${
                            isProfit ? "text-green-500" : "text-red-500"
                          }`}
                        />
                      }
                      variant={isProfit ? "profit" : "loss"}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
