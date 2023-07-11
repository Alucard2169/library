import React, { createContext, FC, ReactNode, useState } from "react";

interface AuthFormContext {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const authForm = createContext<AuthFormContext | null>(null);

interface AuthFormProviderProps {
  children: ReactNode;
}

const AuthFormProvider: FC<AuthFormProviderProps> = ({ children }) => {
  const [state, setState] = useState<boolean>(false);

  const contextValue: AuthFormContext = {
    state,
    setState,
  };

  return <authForm.Provider value={contextValue}>{children}</authForm.Provider>;
};

export { authForm, AuthFormProvider };
