"use client";

import { createContext, useContext, useState, useEffect } from "react";

// magagaling sa backend
interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

// i-store inside context
interface UserContextType {
  user: User | null;
  loading: boolean;
  checkingAuth: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

// Create the actual context container
// Default value is undefined so we can detect incorrect usage
const UserContext = createContext<UserContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [checkingAuth, setCheckingAuth] = useState(true);

  // auto-refresh
  const refreshSession = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) return false;

      return true;
    } catch {
      return false;
    }
  };

  // auto-fetch profile on page load
  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        credentials: "include",
      });
      if (res.status === 401) {
        const refreshed = await refreshSession();

        if (refreshed) {
          return fetchProfile();
        }
        setUser(null);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
      setCheckingAuth(false);
    }
  };

  // useEffect to load fetchProfile
  useEffect(() => {
    fetchProfile();
  }, []);

  // logut user
  const logout = async () => {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, loading, checkingAuth, setUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

// Custom hook para di kailangan gumamit ng useContext(UserContext) lagi
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return context;
};
