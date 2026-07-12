import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  clearAuthToken,
  getCurrentUser,
  loginAccount,
  loginWithGoogle,
  registerAccount,
} from "../services/authApi";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((currentUser) => {
        if (active) setUser(currentUser);
      })
      .catch(() => {
        clearAuthToken();
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (identifier, password) => {
    const nextUser = await loginAccount(identifier, password);
    setUser(nextUser);
    return nextUser;
  }, []);

  const register = useCallback(async (data) => {
    const nextUser = await registerAccount(data);
    setUser(nextUser);
    return nextUser;
  }, []);

  const googleLogin = useCallback(async (credential) => {
    const nextUser = await loginWithGoogle(credential);
    setUser(nextUser);
    return nextUser;
  }, []);

  const logout = useCallback(() => {
    clearAuthToken();
    setUser(null);
    navigate("/login");
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      googleLogin,
      logout,
    }),
    [user, loading, login, register, googleLogin, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
