import React, { useState, useEffect, useContext, createContext } from "react";
import AccountService from "../../data/services/AccountService";
import { UserData } from "../../data/entities/UserData";

interface IAuthContext {
  user: UserData | false;
  setUser: (userData: UserData | false) => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: null,
});

function useProvideAuth() {
  const [userData, setUserData] = useState(null);

  const setUser = (userData: UserData | false) => {
    setUserData(userData);
  };

  useEffect(() => {
    if (userData == null) {
      const accountService = new AccountService();
      accountService.get().then((res) => {
        setUserData(res.success ? res.result : false);
      });
    }
  });

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

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};
