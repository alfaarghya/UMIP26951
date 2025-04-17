'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type UserContextType = {
  name: string;
  setName: (name: string) => void;
};

const UserContext = createContext<UserContextType>({
  name: '',
  setName: () => { },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const storedName = localStorage.getItem('name') || '';
    setName(storedName);
  }, []);

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
