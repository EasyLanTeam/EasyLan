import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
import AccountService from "../../../data/services/AccountService";
import { useAuth } from "../../../domain/auth/appAuth";
import LocationState from "../../../infrastructure/ui/types/LocationState";

interface ILogoutPageProps {}

const LogoutPage: React.FunctionComponent<ILogoutPageProps> = (
  props: ILogoutPageProps
) => {
  const [isComplete, setIsComplete] = React.useState(false);
  const { setUser } = useAuth();
  const history = useHistory();
  const location = useLocation<LocationState>();

  React.useEffect(() => {
    if (!isComplete) {
      console.log("Произвожу выход");
      setIsComplete(true);
      const accountService = new AccountService();

      accountService.logout().then(() => {
        setUser(false);
        console.log("Готово...");
      });
    } else {
      setTimeout(() => {
        const { from } = location.state || { from: { pathname: "/" } };
        history.replace(from);
      }, 200);
    }
  });

  return (
    <span>
      {`Производим выход из приложения... ${isComplete ? "Готово" : ""}`}
    </span>
  );
};

export default LogoutPage;
