import  { createContext, useState, useContext } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  const login = () => {
    // Lógica para iniciar sesión...
    setIsAuthenticated(true);
  };

  console.log("Valor de usuarioLogueado en AuthContext:", isAuthenticated);
   
  const logout = () => {
    // Lógica para cerrar sesión...
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);