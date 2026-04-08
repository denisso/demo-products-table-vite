import { create } from 'zustand';
import { type FetchError } from '@/shared/api';

interface AuthState {
  isPending: boolean;
  error: FetchError | null;
  setStateAuth: (isLoading: boolean, error: FetchError| null) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isPending: false,
  error: null,
  setStateAuth: (isPending, error) => {
    set({ isPending });
    set({ error });
  },
}));
