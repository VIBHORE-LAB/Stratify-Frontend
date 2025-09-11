import { useQuery } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";


export function useFetch<T>(url:string){
    return useQuery<T, Error>({
        queryKey:[url],
        queryFn: async () =>{
            const res = await axiosClient.get<T>(url);
            return res.data;
        }
    })
}