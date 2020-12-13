import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from "../Header";
import LoginPage from "../../pages/LoginPage";
import Main from "../Main";
import RegisterPage from "../../pages/RegisterPage";
import TournamentsPage from "../../pages/TournamentsPage";
import UserPage from "../../pages/UserPage";
import { ToastContainer } from "react-toastify";
import { ProvideAuth } from "../../../domain/auth/appAuth";
import MainPage from "../../pages/MainPage/MainPage";
import LogoutPage from "../../pages/LogoutPage/LogoutPage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

import styles from "./App.style.scss";

export interface IAppProps {}

export default class App extends React.Component<IAppProps> {
  public render(): JSX.Element {
    return (
      <ProvideAuth>
        <div className={styles.container}>
          <BrowserRouter>
            <Header />

            <Main>
              <Switch>
                <Route path="/" exact>
                  <MainPage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/logout">
                  <LogoutPage />
                </Route>
                <Route path="/register">
                  <RegisterPage />
                </Route>
                <Route path="/tournaments">
                  <TournamentsPage />
                </Route>
                <Route path="/user/:id">
                  <UserPage />
                </Route>
                <Route path="*">
                  <ErrorPage code={404} />
                </Route>
              </Switch>
            </Main>
          </BrowserRouter>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover={false}
            className={styles.notificationContainer}
          />
        </div>
      </ProvideAuth>
    );
  }
}
