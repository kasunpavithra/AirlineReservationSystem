import {
  useState,
  createContext,
  children,
  useContext,
  useEffect,
} from "react";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
    }
  });

  const login = (user) => {
    setUser(user);
    if (user) {
      localStorage.setItem("user", user);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.setItem("user", null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
