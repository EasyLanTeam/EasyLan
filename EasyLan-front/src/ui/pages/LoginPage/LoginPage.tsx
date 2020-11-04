import * as React from "react";
import Icon from "@mdi/react";
import { mdiAlphaEBox, mdiVk } from "@mdi/js";

import Input from "../../components/base/Input/Input";
import FormLabel from "../../components/base/FormLabel";
import Button from "../../components/base/Button";

import styles from "./LoginPage.style.scss";

interface ILoginPageProps {}

interface ILoginPageState {
  username: string;
  password: string;
  errorMessage: string;
}

export default class LoginPage extends React.Component<
  ILoginPageProps,
  ILoginPageState
> {
  constructor(props: ILoginPageProps) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorMessage: null,
    };
  }

  handleSubmit = (evt: any) => {
    const { username, password } = this.state;

    this.setState({ errorMessage: "" }, () => {
      const req = {
        username,
        password,
      };

      fetch("/api/Identity", {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        mode: "cors",
      }).then((res) => {
        if (res.status === 401) {
          this.setState({
            errorMessage: "Неверное имя пользователя или пароль",
          });
          return;
        }
        if (res.status !== 200) {
          this.setState({
            errorMessage: "Ошибка сервера",
          });
          return;
        }

        this.setState({ errorMessage: "Вход произведен успешно" });
      });
    });
  };

  handleChangeUsername = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: evt.target.value });
  };
  handleChangePassword = (evt: any) => {
    this.setState({ password: evt.target.value });
  };

  public render() {
    const { username, password, errorMessage } = this.state;

    return (
      <div className={styles.card}>
        <div className={styles.form}>
          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>Вход</h3>
          </div>
          <div className={styles.formBody}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel} htmlFor="username">
                Имя пользователя
              </FormLabel>
              <Input
                id="username"
                value={username}
                className={styles.input}
                onChange={this.handleChangeUsername}
              ></Input>
            </div>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel} htmlFor="password">
                Пароль
              </FormLabel>
              <Input
                id="password"
                type={"password"}
                value={password}
                className={styles.input}
                onChange={this.handleChangePassword}
              ></Input>
            </div>
            <span className={styles.formErrorMessage}>{errorMessage}</span>
            <Button className={styles.submitButton} variant="primary" onClick={this.handleSubmit}>
              Войти
            </Button>
          </div>
        </div>
        <div className={styles.altSigns}>
          <span className={styles.altSignsTitle}>Или</span>
          <Button className={styles.signInVkButton}>
            <Icon size="24px" className={styles.vkIcon} path={mdiVk}></Icon>
            Войти с помощью вконтакте
          </Button>
        </div>
      </div>
    );
  }
}
