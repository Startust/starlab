import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = { id: string; email?: string; name?: string };

type AuthState = {
  accessToken: string | null;
  user: User | null;
  setToken: (t: string | null) => void;
  setUser: (u: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setToken: (accessToken) => set({ accessToken }),
      setUser: (user) => set({ user }),
      logout: () => set({ accessToken: null, user: null }),
    }),
    { name: 'auth-store' }, // localStorage key
  ),
);

/** 推荐：用 selector 计算派生值 */
export const selectIsAuthenticated = (s: AuthState) => Boolean(s.accessToken);
