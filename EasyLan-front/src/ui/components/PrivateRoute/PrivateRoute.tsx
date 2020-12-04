import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../../../domain/auth/appAuth";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

type UserRoles = "admin" | "initiator";

type PrivateRouteProps = {
  roles?: string[];
  children: React.ReactNode;
} & RouteProps;

export function PrivateRoute({
  children,
  roles: onlyFor,
  ...rest
}: PrivateRouteProps) {
  const auth = useAuth();

  const renderChildren = (location: any) => {
    if (auth.user === null) return null;

    if (auth.user !== false && auth.user.role) {
      if (!onlyFor) return children;

      if (auth.user.role === "admin" || onlyFor.includes(auth.user.role))
        return children;
      else return <ErrorPage code={404} />;
    } else {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      );
    }
  };

  return (
    <Route {...rest} render={({ location }) => renderChildren(location)} />
  );
}
