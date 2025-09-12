import axiosClient from "./axiosClient";

export async function getTickers(){
    const res = await axiosClient.get("/tickers/");
    return res.data;
}
