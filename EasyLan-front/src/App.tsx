import React from "react";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";

import Header from "./ui/components/Header";
import LoginPage from "./ui/pages/Login/LoginPage";

export interface IAppProps {}

export default class App extends React.Component<IAppProps> {
  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <Header />

        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>

          <Redirect to="/login"></Redirect>
        </Switch>
      </BrowserRouter>
    );
  }
}
