import axiosClient from "./axiosClient";

export async function fetchResultsHistory(limit: number = 5, offset: number = 0) {
  const res = await axiosClient.get("/results", {
    params: {
      limit,
      offSet: offset,
    },
  });
  return res.data; 
}


export async function getCount(){
    const res = await axiosClient.get("/results/count");
    return res.data;
}


export async function getLatest() {
  const res = await axiosClient.get("/results/latest"); 
  return res.data; 
}
