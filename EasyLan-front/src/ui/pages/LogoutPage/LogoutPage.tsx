import * as React from "react";

interface ILogoutPageProps {}

interface ILogoutPageState {
  isComplete: boolean;
}

export default class LogoutPage extends React.Component<
  ILogoutPageProps,
  ILogoutPageState
> {
  componentDidMount() {
    console.log("Произвожу выход");
  }

  render() {
    const { isComplete } = this.state;

    return (
      <span>
        {`Производим выход из приложения... ${isComplete ? "Готово" : ""}`}
      </span>
    );
  }
}
