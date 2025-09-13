// types.ts
export interface Trade {
  orderId: string;
  timestamp: string;
  nav?: string;
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
  finalNav: string;
  startingNav: string;
  pctChange: number; 
  cash: string;           
  position: number;
  navFile: string;
  tradesFile: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  ticker: string;
  updatedAt: string;
  Strategy: {
    name: string;
    params: StrategyParams;
  };
  Trades?: Trade[];
  winRate? : number;
}
export interface Ticker {
  value: string;
  label: string;
}

export interface TickerState {
  tickers: Ticker[];
  loading: boolean;
  error: string | null;
}
