import { useEffect, useState } from "react";

export const useUsername = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  const login = (name: string, userId: string) => {
    localStorage.setItem("username", name);
    localStorage.setItem("userId", userId);
    setUsername(name);
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    document.cookie = "token=; Max-Age=0; path=/";
  };

  return { username, login, logout };
};
