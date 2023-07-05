import { createContext, useState } from "react";

const baseURL = `https://route-ecommerce.onrender.com/api/v1/`;
const AuthContext = createContext({});

// children are the components which will be nested inside the AuthProvider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth, baseURL }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// after finshing, go to index to provide context for the full app.

// 1) Creating AuthProvider.js component
// 2) Creating Context provider
// 3) Wrapping the app with AuthProvider.
// 4) Importing useContext in the file where i want to use context
// 5) Importing the Full AuthContext in the file where i want to use context.
