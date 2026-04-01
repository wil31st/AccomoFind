'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'renter' | 'subletter';
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => { success: boolean; error?: string };
  signUp: (name: string, email: string, password: string, role: 'renter' | 'subletter') => { success: boolean; error?: string };
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = 'flatmatefind_users';
const SESSION_KEY = 'flatmatefind_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) setUser(JSON.parse(session));
    setLoading(false);
  }, []);

  function getUsers(): StoredUser[] {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  function signIn(email: string, password: string) {
    const users = getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { success: false, error: 'Incorrect email or password.' };
    const { password: _pw, ...sessionUser } = found;
    setUser(sessionUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return { success: true };
  }

  function signUp(name: string, email: string, password: string, role: 'renter' | 'subletter') {
    const users = getUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser: StoredUser = { id: `user-${Date.now()}`, name, email, password, role };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    const { password: _pw, ...sessionUser } = newUser;
    setUser(sessionUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return { success: true };
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
