"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Organisation {
  id: string;
  name: string;
}

interface Session {
  user: User | null;
  organisation: Organisation | null;
  role: string | null;
  permissions: string[];
}

interface AuthContextType {
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, organisation?: Organisation, role?: string) => void;
  logout: () => void;
  updateOrganisation: (org: Organisation, role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated initial session (for demonstration, we will start as unauthenticated)
// To test authenticated state, you could change this to return a mock session.
const getStoredSession = (): Session | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("nexus_session");
  return stored ? JSON.parse(stored) : null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Restore session on mount
    const stored = getStoredSession();
    if (stored) {
      setSession(stored);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const isAuthRoute = pathname === "/" || pathname === "/onboarding" || pathname.startsWith("/org/");
    const isProtectedRoute = pathname.startsWith("/dashboard");

    if (session && session.user && session.organisation) {
      // User is fully authenticated with an org, they shouldn't see landing/onboarding
      if (isAuthRoute) {
        router.replace("/dashboard");
      }
    } else if (session && session.user && !session.organisation) {
      // User is logged in but hasn't picked an org, restrict from landing and dashboard
      if (pathname === "/" || isProtectedRoute) {
        router.replace("/onboarding");
      }
    } else {
      // User is not logged in, restrict from protected routes
      if (isProtectedRoute || pathname === "/onboarding" || pathname.startsWith("/org/")) {
        router.replace("/");
      }
    }
  }, [session, isLoading, pathname, router]);

  const login = (user: User, organisation?: Organisation, role?: string) => {
    const newSession = {
      user,
      organisation: organisation || null,
      role: role || null,
      permissions: ["read", "write"]
    };
    setSession(newSession);
    localStorage.setItem("nexus_session", JSON.stringify(newSession));
    if (organisation) {
      router.push("/dashboard");
    } else {
      router.push("/onboarding");
    }
  };

  const updateOrganisation = (org: Organisation, role: string) => {
    if (!session) return;
    const newSession = {
      ...session,
      organisation: org,
      role: role
    };
    setSession(newSession);
    localStorage.setItem("nexus_session", JSON.stringify(newSession));
    router.push("/dashboard");
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem("nexus_session");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ session, isAuthenticated: !!session?.user, isLoading, login, logout, updateOrganisation }}>
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
