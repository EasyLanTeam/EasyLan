import React, { useState, useEffect, useContext, createContext } from "react";
import { UserData } from "../../data/entities/UserData";

interface IAuthContext {
  user: UserData;
  setUser: (userData: UserData) => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: null,
});

function useProvideAuth() {
  const [userData, setUserData] = useState(null);

  const setUser = (userData: UserData) => {
    setUserData(userData);
    console.log("ok, userData has setted", userData);
  };

  return {
    user: userData,
    setUser,
  };
}

type ProvideAuthProps = {
  children: React.ReactNode;
};

export const ProvideAuth: React.FunctionComponent<ProvideAuthProps> = ({
  children,
}: ProvideAuthProps) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
