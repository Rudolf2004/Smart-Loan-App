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
    await loginAccount(identifier, password);
    const verifiedUser = await getCurrentUser();
    setUser(verifiedUser);
    return verifiedUser;
  }, []);

  const register = useCallback(async (data) => {
    await registerAccount(data);
    const verifiedUser = await getCurrentUser();
    setUser(verifiedUser);
    return verifiedUser;
  }, []);

  const googleLogin = useCallback(async (credential) => {
    await loginWithGoogle(credential);
    const verifiedUser = await getCurrentUser();
    setUser(verifiedUser);
    return verifiedUser;
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
