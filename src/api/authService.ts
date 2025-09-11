import axiosClient from "./axiosClient";


export interface RegisterPayload {
    email: string;
    name: string;
    password: string;

}


export interface LoginPayload {
    email: string;
    password: string;
}

export async function registerUser(data: RegisterPayload){
    const res = await axiosClient.post("/auth/register", data);
    return res.data;
}


export async function loginUser(data: LoginPayload){
    const res = await axiosClient.post("/auth/login", data);
    return res.data;
}