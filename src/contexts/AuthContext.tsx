import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { mockUsers } from '../data/mockUsers';
import { User, UserRole } from '../types';

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
  registerOrganizer: (payload: { name: string; email: string; password: string }) => { success: boolean; message?: string };
  isAuthenticated: boolean;
  isRole: (roles: UserRole | UserRole[]) => boolean;
}

const STORAGE_KEY = 'agenda-cultural-cg-auth';
const USERS_KEY = 'agenda-cultural-cg-users';

const getStoredUsers = (): User[] => {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
    return mockUsers;
  }

  try {
    return JSON.parse(raw) as User[];
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
    return mockUsers;
  }
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        const parsed = JSON.parse(raw) as User;
        setUser(parsed);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (email: string, password: string) => {
    const users = getStoredUsers();
    const found = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
    );

    if (!found || !found.active) {
      return { success: false, message: 'Credenciais inválidas.' };
    }

    setUser(found);
    return { success: true };
  };

  const logout = () => setUser(null);

  const registerOrganizer = (payload: { name: string; email: string; password: string }) => {
    const trimmedName = payload.name.trim();
    const trimmedEmail = payload.email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail || !payload.password.trim()) {
      return { success: false, message: 'Preencha todos os campos.' };
    }

    const users = getStoredUsers();
    const exists = users.some((item) => item.email.toLowerCase() === trimmedEmail);
    if (exists) {
      return { success: false, message: 'Este e-mail já está em uso.' };
    }

    const newOrganizer: User = {
      id: `organizer-${Date.now()}`,
      name: trimmedName,
      email: trimmedEmail,
      password: payload.password,
      role: 'organizer',
      active: true,
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newOrganizer]));
    setUser(newOrganizer);
    return { success: true, message: 'Cadastro realizado com sucesso.' };
  };

  const isRole = (roles: UserRole | UserRole[]) => {
    const allowed = Array.isArray(roles) ? roles : [roles];
    return !!user && allowed.includes(user.role);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login,
      logout,
      registerOrganizer,
      isAuthenticated: !!user,
      isRole,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
