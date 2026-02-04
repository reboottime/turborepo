"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for auth cookie on mount
    const authCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("portal_auth="));

    if (authCookie) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    // Mock authentication - in real app, this would call an API
    // For demo purposes, accept any non-empty credentials
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Set auth cookie (expires in 7 days)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    document.cookie = `portal_auth=authenticated; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;

    setIsAuthenticated(true);
  };

  const signOut = () => {
    // Clear auth cookie
    document.cookie =
      "portal_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict";
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
