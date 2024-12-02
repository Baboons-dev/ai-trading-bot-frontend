import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/use-store';
import { GetUser } from '@/api/apiCalls/user';

export const useAuth = () => {
  const { user, token, setUser, setToken, logout } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      if (token && !user) {
        try {
          const userData = await GetUser();
          setUser(userData);
        } catch (error) {
          logout();
        }
      }
    };

    initAuth();
  }, [token, user, setUser, logout]);

  return { user, token, setUser, setToken, logout };
};