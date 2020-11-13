import React from "react";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";

import Header from "../Header";
import LoginPage from "../../pages/LoginPage";
import Main from "../Main";
import RegisterPage from "../../pages/RegisterPage";
import CreateTournamentPage from "../../pages/CreateTournamentPage";

import styles from "./App.style.scss";
import TournamentsPage from "../../pages/TournamentsPage/TournamentsPage";

export interface IAppProps {}

export default class App extends React.Component<IAppProps> {
  public render(): JSX.Element {
    return (
      <div className={styles.container}>
        <BrowserRouter>
          <Header />

          <Main>
            <Switch>
              <Route path="/" exact>
                <Redirect to="/login"></Redirect>
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/tournaments">
                <TournamentsPage />
              </Route>
              <Route path="/createtournament">
                <CreateTournamentPage />
              </Route>
            </Switch>
          </Main>
        </BrowserRouter>
      </div>
    );
  }
}
