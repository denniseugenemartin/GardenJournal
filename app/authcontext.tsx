import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

type User = {
  id: number;
  name: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/me`, {
        credentials: "include",
      });

      if (res.status === 401) {
        setUser(null);
        return false;
      }

      const data = await res.json();
      setUser(data.user);
      return true;
    } catch {
      setUser(null);
      return false;
    }
  };

  const refreshUser = async () => {
    setLoading(true);
    const ok = await fetchMe();

    if (!ok) {
      router.replace("/login");
    }

    setLoading(false);
  };

  const logout = async () => {
    try {
      await fetch(`${BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.log("Logout error:", e);
    }

    setUser(null);
    router.replace("/"); // or "/login"
  };

  useEffect(() => {
    (async () => {
      await refreshUser();
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
