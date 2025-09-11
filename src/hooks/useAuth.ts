import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginThunk, registerThunk, logout } from "../features/auth/authSlice";
import { LoginPayload, RegisterPayload } from "../api/authService";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, token, loading, error } = useAppSelector((state) => state.auth);

  const register = (data: RegisterPayload) => dispatch(registerThunk(data));
  const login = (data: LoginPayload) => dispatch(loginThunk(data));
  const logoutUser = () => dispatch(logout());

  return { user, token, loading, error, register, login, logoutUser };
}
