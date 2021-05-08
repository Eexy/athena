import React, { createContext } from 'react';

interface IAuthContext {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<IAuthContext>({
  auth: false,
  setAuth: () => {},
});

export default AuthContext;
