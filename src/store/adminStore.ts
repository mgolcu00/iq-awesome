import { create } from 'zustand';

interface AdminState {
  isAuthenticated: boolean;
  adminEmail: string | null;
  setAuthenticated: (status: boolean, email: string | null) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isAuthenticated: false,
  adminEmail: null,
  setAuthenticated: (status, email) => set({ isAuthenticated: status, adminEmail: email }),
  logout: () => set({ isAuthenticated: false, adminEmail: null }),
}));