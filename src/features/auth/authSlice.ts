import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {loginUser, registerUser, RegisterPayload, LoginPayload} from "../../api/authService";
import { AxiosError } from "axios";

interface AuthState{
    user: unknown | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    
}


const initialState: AuthState = {
    user: null,
  token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
};


export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      return await registerUser(payload);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response?.data || err.message);
      }
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);


export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      return await loginUser(payload);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return rejectWithValue("Invalid Credentials");
        }

        return rejectWithValue(err.response?.data || err.message);
      }

      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }

      return rejectWithValue("An unknown error occurred");
    }
  }
);



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) =>{
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
        }
    },

    extraReducers:(builder) =>  {
       builder
       .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;

       })

       .addCase(registerThunk.fulfilled, (state,action) =>{
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("userId", action.payload.user.id);
       })

       .addCase(registerThunk.rejected, (state,action) =>{
        state.loading = false;
        state.error = action.payload as string;
       })

       .addCase(loginThunk.pending, (state) =>{
        state.loading = true;
        state.error = null;
       })

       .addCase(loginThunk.fulfilled, (state,action) =>{
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token)
        localStorage.setItem("userId", action.payload.user.id);
       })

       .addCase(loginThunk.rejected,(state,action) =>{
        state.loading = false;
        state.error = action.payload as string;
       }) 
    }

})


export const {logout} = authSlice.actions;
export default authSlice.reducer;