import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { DollarSign, TrendingUp, Target, BarChart3 } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Customized,
} from "recharts";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Trade, StrategyResult } from "../types";
import ColorizedLine from "./ColorizedLine";

interface ResultPanelProps {
  result: StrategyResult | any;
  connectionStatus: "connected" | "disconnected" | "reconnecting";
}

const formatPnL = (start: number, end: number) => {
  console.log("start", start, "end", end);
  const diff = end - start;
  const sign = diff >= 0 ? "+" : "-";
  return `${sign}$${Math.abs(diff).toLocaleString()}`;
};

export const ResultPanel: React.FC<ResultPanelProps> = ({
  result,
  connectionStatus,
}) => {
  if (!result) {
    if (
      connectionStatus === "disconnected" ||
      connectionStatus === "reconnecting"
    ) {
      return (
        <Card className="border-border/50 bg-card/50">
          <CardContent className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="text-lg text-foreground mb-2">
              {connectionStatus === "disconnected"
                ? "Run your backtest"
                : "Reconnecting..."}
            </CardTitle>
            <CardDescription className="mb-6">
              {connectionStatus === "disconnected"
                ? "Go ahead and configure your strategy parameters, then click 'Run Backtest' to see results here."
                : "Attempting to reconnect to the server..."}
            </CardDescription>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="border-border/50 bg-[#0f0f0f]/50 ">
        <CardContent className="text-center py-12">
          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <CardTitle className="text-lg text-foreground mb-2">
            Ready to Backtest
          </CardTitle>
          <CardDescription className="mb-6">
            Configure your strategy parameters and run your first backtest
          </CardDescription>
        </CardContent>
      </Card>
    );
  }
  console.log("result in panel", result);
  const trades: Trade[] = result.Trades || [];
  const start =  100000;
const chartData = trades.length > 0
  ? trades.map((trade, i) => ({
      date: `T${i + 1}`,
      nav: trade.nav !== undefined && trade.nav !== null
        ? parseFloat(trade.nav as string)
        : start,
    }))
  : [{ date: "T1", nav: start }];

  console.log("Raw trades:", trades);
  console.log(
    "Chart data for LineChart:",
    chartData.map((d) => ({ date: d.date, nav: d.nav, type: typeof d.nav }))
  );

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="trading-card-hover border-border/50 bg-[#0f0f0f] group">
          <CardContent className="p-4 text-white">
            <div className="flex items-center bg-[#0f0f0f] space-x-2 mb-2">
              <DollarSign className="h-6 w-6 text-green-500" />
              <span className="text-2xl text-white">Final NAV</span>
            </div>
            <p className="text-xl font-bold text-white pl-1 transition-colors">
              ${Number(result.finalNav).toLocaleString()}
            </p>
            <p className="text-sm text-trading-profit">
              {result.pctChange ? `${result.pctChange}%` : ""}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-[#0f0f0f]">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-green-600" />
              <span className="text-2xl text-white">Total Trades</span>
            </div>
            <p className="text-xl p-1 font-bold text-white">{trades.length}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-[#0f0f0f] ">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-trading-profit text-green-600" />
              <span className="text-2xl text-white">Win Rate</span>
            </div>
            <p className="text-xl pl-4 pt-2 font-bold text-white">
              {result.winRate?.toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-[#0f0f0f]">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              {result.finalNav >= start ? (
                <DollarSign className="h-6 w-6 text-green-600 text-trading-profit" />
              ) : (
                <DollarSign className="h-6 w-6 text-red-600 text-trading-loss" />
              )}
              <span className="text-xl text-white">P&L</span>
            </div>
            <p className="text-2xl font-bold text-white">
{formatPnL(start, Number(result.finalNav))}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Equity Curve */}
      <Card className="chart-container group bg-[#0f0f0f]">
        <CardHeader className="border-b border-border/30">
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            Equity Curve
          </CardTitle>
          <CardDescription className="text-gray-400">
            Portfolio value over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date"  stroke="#ccc" label={{
                    value:"Trades",
                    position:"bottom",
                    offset: 10,
                    fill: "#ccc",
                    fontSize:14,

                }} />
               <YAxis
  stroke="#ccc"
  type="number"
  tickFormatter={(v) => `$${v.toLocaleString()}`}
  domain={([dataMin, dataMax]: [number, number]) => [
    Math.min(dataMin, dataMax) * 0.98,
    Math.max(dataMin, dataMax) * 1.02,
  ]}
  label={{
    fontSize: 8
  }}
/>

                <Tooltip
                  formatter={(value: number) => `$${value.toFixed(2)}`}
                  labelFormatter={(label) => `Trade ${label}`}
                />
                <ReferenceLine
                  y={start}
                  stroke="#888"
                  strokeDasharray="5 5"
                />

                {/* Debug fallback line (green) */}
                <Line
                  dataKey="nav"
                  stroke="#0f0"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />

                {/* Custom renderer */}
                <Customized component={ColorizedLine} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Trades Table */}
      <Card className="trading-card group text-white bg-[#0f0f0f] mt-6">
        <CardHeader className="border-b text-white border-border/30">
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="h-5  w-5 mr-2 text-green-600" />
            Trade History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white text-xl">Side</TableHead>
                <TableHead className="text-white text-xl">Quantity</TableHead>
                <TableHead className="text-white text-xl">Price</TableHead>
                <TableHead className="text-white text-xl">Timestamp</TableHead>
                <TableHead className="text-white text-xl">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((t, idx) => {
                const qty = Number(t.qty) || 0;
                const price = Number(t.price) || 0;
                const total = qty * price;
                return (
                  <TableRow key={t.orderId || idx}>
                    <TableCell className="text-muted-foreground">
                      {t.timestamp || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={t.side === "BUY" ? "default" : "secondary"}
                        className={
                          t.side === "BUY"
                            ? "bg-trading-profit text-green-600 border-trading-profit/50"
                            : "bg-trading-loss text-red-600 border-trading-loss/50"
                        }
                      >
                        {t.side}
                      </Badge>
                    </TableCell>
                    <TableCell>{qty}</TableCell>
                    <TableCell>${price.toFixed(2)}</TableCell>
                    <TableCell className="font-medium">
                      ${total.toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultPanel;
