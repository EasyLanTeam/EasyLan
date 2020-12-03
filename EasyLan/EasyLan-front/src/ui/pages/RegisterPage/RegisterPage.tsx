import * as React from "react";

import Input from "../../components/base/Input/Input";
import FormLabel from "../../components/base/FormLabel";
import Button from "../../components/base/Button";

import styles from "./RegisterPage.style.scss";

interface IRegisterPageProps {}

interface IRegisterPageState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  errorMessage: string;
}

class RegisterPage extends React.Component<
  IRegisterPageProps,
  IRegisterPageState
> {
  constructor(props: IRegisterPageProps) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: null,
    };
  }

  handleSubmit = (evt: any) => {
    const { username, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ errorMessage: "Пароли должны совпадать" });
      return;
    }

    this.setState({ errorMessage: "" }, () => {
      const req = {
        username,
        email,
        password,
        fullname: username,
      };

      fetch("/Registration", {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        mode: "cors",
      }).then((res) => {
        if (res.status === 422) {
          this.setState({
            errorMessage: "Пользователь с таким именем уже существует",
          });
          return;
        }
        if (res.status !== 200) {
          this.setState({
            errorMessage: "Ошибка сервера",
          });
          return;
        }

        this.setState({ errorMessage: "Регистрация произведена успешно" });
      });
    });
  };

  handleChangeUsername = (evt: any) => {
    this.setState({ username: evt.target.value });
  };
  handleChangeEmail = (evt: any) => {
    this.setState({ email: evt.target.value });
  };
  handleChangePassword = (evt: any) => {
    this.setState({ password: evt.target.value });
  };
  handleChangeConfirmPassword = (evt: any) => {
    this.setState({ confirmPassword: evt.target.value });
  };

  public render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      errorMessage,
    } = this.state;

    return (
      <div className={styles.card}>
        <div className={styles.form}>
          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>Регистрация</h3>
          </div>
          <div className={styles.formBody}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel} htmlFor="email">
                E-mail
              </FormLabel>
              <Input
                id="email"
                className={styles.input}
                value={email}
                onChange={this.handleChangeEmail}
              ></Input>
            </div>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel} htmlFor="username">
                Имя пользователя
              </FormLabel>
              <Input
                id="username"
                className={styles.input}
                value={username}
                onChange={this.handleChangeUsername}
              ></Input>
            </div>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel} htmlFor="password">
                Пароль
              </FormLabel>
              <Input
                id="password"
                className={styles.input}
                value={password}
                type={"password"}
                onChange={this.handleChangePassword}
              ></Input>
            </div>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel} htmlFor="confirmPassword">
                Повторите пароль
              </FormLabel>
              <Input
                id="confirmPassword"
                className={styles.input}
                value={confirmPassword}
                type={"password"}
                onChange={this.handleChangeConfirmPassword}
              ></Input>
            </div>
            <span className={styles.formErrorMessage}>{errorMessage}</span>
            <Button
              className={styles.submitButton}
              variant="primary"
              onClick={this.handleSubmit}
            >
              Зарегистрироваться
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
