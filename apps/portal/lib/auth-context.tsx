"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { apiClient } from "./api-client";

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "portal_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      apiClient.setToken(token);
      setIsAuthenticated(true);
      // Set sync cookie for middleware
      document.cookie = "portal_token_exists=true; path=/; SameSite=Strict";
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const response = await apiClient.login({ email, password });
    const token = response.accessToken;

    // Store token and set on API client
    localStorage.setItem(TOKEN_KEY, token);
    apiClient.setToken(token);
    setIsAuthenticated(true);

    // Set sync cookie for middleware
    document.cookie = "portal_token_exists=true; path=/; SameSite=Strict";
  };

  const signOut = () => {
    // Clear token from storage and API client
    localStorage.removeItem(TOKEN_KEY);
    apiClient.setToken(null);
    setIsAuthenticated(false);

    // Clear sync cookie
    document.cookie =
      "portal_token_exists=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict";
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
