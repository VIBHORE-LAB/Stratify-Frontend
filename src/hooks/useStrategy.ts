import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addLiveTrade,
  markBacktestComplete,
  markBacktestError,
  setLoading,
} from "../features/strategy/backtestSlice";
import { StrategyResult, Trade } from "../types";
import { normalizeTrade, normalizeTrades } from "../Helpers/normalizeTrades";

export function useStrategy(userId: string | null) {
  const dispatch = useAppDispatch();
  const { currentResult, loading, error } = useAppSelector((state) => state.backtester);
  const socketRef = useRef<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "reconnecting"
  >("disconnected");

  useEffect(() => {
    sessionStorage.removeItem("lastBacktest");
  }, []);

  useEffect(() => {
    if (!currentResult) {
      const stored = sessionStorage.getItem("lastBacktest");
      if (stored) {
        try {
          const parsed: StrategyResult = JSON.parse(stored);
          parsed.Trades = normalizeTrades(parsed.Trades ?? []);
          dispatch(markBacktestComplete(parsed));
        } catch (err) {
          console.warn("Failed to parse last backtest from sessionStorage", err);
        }
      }
    }
  }, [currentResult, dispatch]);

  useEffect(() => {
    if (!userId) return;

 const socket = io("https://stratify-backend-etsq.onrender.com", {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ["websocket"],
});

    socketRef.current = socket;

    const handleConnect = () => {
      setConnectionStatus("connected");
      socket.emit("auth", { userId });
    };

    const handleTrade = (trade: Trade) => {
      const normalized = normalizeTrade(trade);
      dispatch(addLiveTrade(normalized));
    };

    const handleComplete = (result: StrategyResult) => {
      const normalized = {
        ...result,
        Trades: normalizeTrades(result.Trades ?? []),
      };
      dispatch(markBacktestComplete(normalized));
      dispatch(setLoading(false));
      sessionStorage.setItem("lastBacktest", JSON.stringify(normalized));
    };

    const handleError = (err: any) => {
      const message = typeof err === "string" ? err : err?.message ?? "Unknown backtest error";
      dispatch(markBacktestError(message));
      dispatch(setLoading(false));
    };

    const handleDisconnect = (reason: string) => {
      console.log("Socket disconnected:", reason);
      setConnectionStatus("disconnected");
      dispatch(setLoading(false));

      // Restore last backtest only on disconnect
      const stored = sessionStorage.getItem("lastBacktest");
      if (stored) {
        try {
          const parsed: StrategyResult = JSON.parse(stored);
          parsed.Trades = normalizeTrades(parsed.Trades ?? []);
          dispatch(markBacktestComplete(parsed));
        } catch (err) {
          console.warn("Failed to parse last backtest from sessionStorage", err);
        }
      }
    };

    const handleReconnectAttempt = () => setConnectionStatus("reconnecting");

    const handleReconnect = () => {
      setConnectionStatus("connected");
      if (userId) socket.emit("auth", { userId });
    };

    // --- Register Events ---
    socket.on("connect", handleConnect);
    socket.on("trade", handleTrade);
    socket.on("backtest_complete", handleComplete);
    socket.on("backtest_error", handleError);
    socket.on("disconnect", handleDisconnect);
    socket.on("reconnect_attempt", handleReconnectAttempt);
    socket.on("reconnect", handleReconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("trade", handleTrade);
      socket.off("backtest_complete", handleComplete);
      socket.off("backtest_error", handleError);
      socket.off("disconnect", handleDisconnect);
      socket.off("reconnect_attempt", handleReconnectAttempt);
      socket.off("reconnect", handleReconnect);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, dispatch]);

  return { currentResult, loading, error, connectionStatus };
}
