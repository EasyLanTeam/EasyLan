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

import styles from "./App.style.scss";
import MainPage from "../../pages/MainPage/MainPage";
import LogoutPage from "../../pages/LogoutPage/LogoutPage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import knowingScreen from "./enquire";

import "./templates-wrapper.css";
import ClubLandingPage from "../../pages/ClubLandingPage/ClubLandingPage";
import DevTeamPage from "../../pages/DevTeamPage/DevTeamPage";

export interface IAppProps { }
export interface IAppState {
  isMobile: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {
  dom: HTMLDivElement | null = null;
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }

  componentDidMount() {
    knowingScreen.enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
  }
  public render(): JSX.Element {
    return (
      <ProvideAuth>
        <div className={styles.container + " templates-wrapper"}
          ref={(d: HTMLDivElement | null) => { this.dom = d; }}>
          <BrowserRouter>
            <Header />

            <Main>
              <Switch>
                <Route path="/" exact>
                  <MainPage isMobile={this.state.isMobile} />
                </Route>
                <Route path="/clubinfo" exact>
                  <ClubLandingPage isMobile={this.state.isMobile} />
                </Route>
                <Route path="/devteam" exact>
                  <DevTeamPage isMobile={this.state.isMobile} />
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
