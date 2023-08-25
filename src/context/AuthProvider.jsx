import React, { createContext, useState, useContext } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const [auth, setAuth] = useState(
    token !== null && token !== ""
      ? {
          token,
          auth: true,
        }
      : {
          token: "",
          auth: false,
        }
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
  
};
// Hook personalizado para usar el contexto
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
