import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token] = useState(() => localStorage.getItem('token'));
  const [role] = useState(() => localStorage.getItem('role'));
  const [name] = useState(() => localStorage.getItem('name'));

  return (
    <AuthContext.Provider value={{ token, role, name }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
