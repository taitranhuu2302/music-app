import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../configs/firebase';

export type AuthContextType = {
  authCurrent: UserType | undefined;
  clearAuth: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

interface IProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IProps) => {
  const [authCurrent, setAuthCurrent] = useState<UserType | undefined>(
    undefined
  );

  useEffect(() => {
    auth.onAuthStateChanged((value) => {
      setAuthCurrent(value?.providerData[0]);
    });
  }, [auth]);

  const clearAuth = () => {
    setAuthCurrent(undefined);
  };

  return (
    <AuthContext.Provider value={{ authCurrent, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
