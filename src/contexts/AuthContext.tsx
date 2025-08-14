
import React from 'react';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  session: null,
  loading: false,
  signOut: () => {},
});

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = {
    user: null,
    session: null,
    loading: false,
    signOut: () => {},
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
