import axiosClient from "./axiosClient";

export interface RunStrategyPayload{
    strategyName: string;
    params: Record<string, unknown>;
    ticker: string;
    startDate: string;
    endDate: string;
}




export async function runStrategy(payload: RunStrategyPayload){
    const res = await axiosClient.post("/strategy/run", payload);
    return res.data;
}