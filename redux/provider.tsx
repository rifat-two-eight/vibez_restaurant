'use client';

import { Provider } from 'react-redux';
import { store } from './store';

import { useEffect, useState } from 'react';
import { setUser } from './features/auth/authSlice';
import { Loader2 } from 'lucide-react';

function HydrateAuth({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      const userStr = localStorage.getItem('user');
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          store.dispatch(setUser({ user, token }));
        } catch (e) {
          console.error("Failed to parse user from localStorage:", e);
        }
      }
    }
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#013622]" />
      </div>
    );
  }

  return <>{children}</>;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <HydrateAuth>{children}</HydrateAuth>
    </Provider>
  );
}
