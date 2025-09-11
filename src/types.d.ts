// types.ts
export interface Trade {
  id: number;
  timestamp: string;
  side: "BUY" | "SELL";
  qty: number;
  price: number;
  total: number;
}

export interface EquityPoint {
  date: string;
  nav: number;
}

export interface Strategy {
  value: string;
  label: string;
}

export interface Ticker {
  value: string;
  label: string;
}

export interface BacktestSummary {
  id: string;
  strategy: string;
  ticker: string;
  finalNAV: number;
  totalTrades: number;
  winRate: number;
  pnl: number;
  date: string;
}
export interface StrategyParams {
  threshold: number;
  qty: number;
}

export interface StrategyResult {
  id: string;
  userId: string;
  strategyId: string;
  finalNav: number;
  startingNav: number;
  pctChange: number;      
  cash: number;           
  position: number;
  navFile: string;
  tradesFile: string;
  createdAt: string;
  updatedAt: string;
  Strategy: {
    name: string;
    params: StrategyParams;
  };
}
