import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Target, Play } from "lucide-react";
import { DatePicker } from "../components/DatePicker";
import { SelectInput } from "../components/SelectInput";
import { StrategyParamsForm } from "../components/StrategyParamsForm";
import { useTickers } from "../hooks/useTickers";
import ResultPanel from "../components/Result";
// import { StrategyResult } from "../types";
import { useStrategy } from "../hooks/useStrategy";
import { useAppDispatch } from "../app/hooks";
import { runStrategyThunk, setLoading } from "../features/strategy/backtestSlice";
// import { Trade } from "../types";
import { useUserId } from "../hooks/useUserId";
const strategies = [
  { value: "momentum", label: "Momentum" },
  { value: "meanrev", label: "Mean Reversion" },
  { value: "crossover", label: "Moving Average Crossover" },
  { value: "rsi", label: "RSI" },
  { value: "bollinger", label: "Bollinger Bands" },
  { value: "breakout", label: "Breakout" },
  { value: "mcad", label: "MCAD" },
  { value: "vwap", label: "VWAP" },
];

const BacktestPage = () => {
  const userId = useUserId();
  console.log("userId", userId);
  const { tickers, loading: tickersLoading, fetchTickers } = useTickers();
  const dispatch = useAppDispatch();

const { currentResult, loading, error: backtestError, connectionStatus } = useStrategy(userId);

  const [selectedTicker, setSelectedTicker] = useState<string>("");
  const [strategy, setStrategy] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [strategyParams, setStrategyParams] = useState<Record<string, unknown>>({});

  useEffect(() => {
    fetchTickers();
  }, []);

  const runBacktest = async () => {
    if (!selectedTicker || !strategy || !startDate || !endDate) return;
const formatDate = (date?: Date) => date ? date.toISOString().split("T")[0] : "";
const payload = {
  ticker: selectedTicker,
  strategyName: strategy,
  startDate: formatDate(startDate), 
  endDate: formatDate(endDate),     
  params: strategyParams,
};

    try {
      await dispatch(runStrategyThunk(payload));
    } catch (err) {
      dispatch(setLoading(false));
      console.error("Backtest failed", err);
    }
  };

  console.log("current", currentResult);

  return (
    <div className="flex-1 p-6 space-y-6 bg-black text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Backtester</h1>
          <p className="text-gray-400 text-lg">
            Test your trading strategies with historical market data
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Real-time Analysis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strategy Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-[#0A0A0A] border border-gray-100/10 shadow-lg hover:shadow-xl transition">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="flex items-center text-white">
                <Target className="h-5 w-5 text-green-400 mr-1" />
                Strategy Configuration
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configure your backtest parameters
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Stock Ticker */}
              <div>
                <Label htmlFor="ticker" className="text-white mb-2">
                  Stock Ticker
                </Label>
                <SelectInput
                  value={selectedTicker}
                  onChange={setSelectedTicker}
                  options={tickers}
                  placeholder={tickersLoading ? "Loading..." : "Select a ticker"}
                  className="bg-black border border-gray-700 text-white placeholder-gray-500 focus:border-green-400 focus:ring-green-400"
                />
              </div>

              {/* Date Range */}
              <div className="grid grid-rows-2 gap-4">
                <div>
                  <Label className="text-white mb-2">Start Date</Label>
                  <DatePicker
                    date={startDate}
                    onChange={setStartDate}
                    className="bg-black border border-gray-700 text-white placeholder-gray-500 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
                <div>
                  <Label className="text-white mb-2">End Date</Label>
                  <DatePicker
                    date={endDate}
                    onChange={setEndDate}
                    className="bg-black border border-gray-700 text-white placeholder-gray-500 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
              </div>

              {/* Trading Strategy */}
              <div>
                <Label htmlFor="strategy" className="text-white mb-2">
                  Trading Strategy
                </Label>
                <SelectInput
                  value={strategy}
                  onChange={(val) => {
                    setStrategy(val);
                    setStrategyParams({});
                  }}
                  options={strategies}
                  placeholder="Select strategy"
                  className="bg-black border border-gray-700 text-white placeholder-gray-500 focus:border-green-400 focus:ring-green-400"
                />
              </div>

              {/* Dynamic Params */}
              {strategy && (
                <StrategyParamsForm
                  strategy={strategy}
                  values={strategyParams}
                  onChange={setStrategyParams}
                />
              )}

              {/* Run Button */}
              <Button
                onClick={runBacktest}
                disabled={!selectedTicker || !strategy || !startDate || !endDate || loading}
                className="w-full bg-green-400 text-black hover:bg-green-500 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full mr-2" />
                    Running Backtest...
                  </>
                ) : (
                  <>
                    <div className="bg-green-400 rounded-full p-1 mr-2">
                      <Play className="h-4 w-4 text-black" />
                    </div>
                    Run Backtest
                  </>
                )}
              </Button>

              {backtestError && <p className="text-red-500 mt-2">{backtestError}</p>}
            </CardContent>
          </Card>
        </div>

        {/* Result Panel */}
        <div className="lg:col-span-2 space-y-6">
<ResultPanel
  result={
    currentResult
      ? {
          ...currentResult,
          finalNav: String(currentResult.finalNav),
          startingNav: String(currentResult.startingNav),
          Strategy: {
            ...(currentResult.Strategy || {}),
            params:
              typeof currentResult.Strategy?.params === "string"
                ? JSON.parse(currentResult.Strategy.params)
                : currentResult.Strategy?.params || {},
          },
Trades: currentResult.Trades?.map((trade: any) => ({
  ...trade,
  nav: trade.nav != null ? Number(trade.nav) : undefined,
})) || [],
        }
      : null
  }
  connectionStatus={connectionStatus}
/>

        </div>
      </div>
    </div>
  );
};

export default BacktestPage;
