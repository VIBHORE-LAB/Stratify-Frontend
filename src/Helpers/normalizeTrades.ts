import { Trade } from "../types";

export function normalizeTrade(raw: any): Trade {
  const qty = Number(raw.qty ?? raw.quantity ?? 0);
  const price = Number(raw.price ?? 0);

  return {
    orderId: String(raw.orderId || raw.order_id || raw.id || "UNKNOWN"),
    timestamp: raw.timestamp || new Date().toISOString(),
    side: raw.side?.toUpperCase() === "SELL" ? "SELL" : "BUY",
    qty,
    price,
    total: qty * price,
    nav: raw.nav,
  };
}

export function normalizeTrades(rawTrades: any[] = []): Trade[] {
  return rawTrades.map(normalizeTrade);
}
