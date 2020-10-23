import * as React from "react";
import Icon from "@mdi/react";
import { mdiVk } from "@mdi/js";

import Input from "../../components/base/Input/Input";
import FormLabel from "../../components/base/FormLabel";
import Button from "../../components/base/Button";

import styles from "./LoginPage.style.scss";

interface ILoginPageProps {}

interface ILoginPageState {
  username: string;
  password: string;
  msg: string;
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
      msg: null,
    };
  }

  handleSubmit = (evt: any) => {
    const { username, password } = this.state;

    this.setState({ msg: "" }, () => {
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
            msg: "Неверное имя пользователя или пароль",
          });
          return;
        }
        if (res.status !== 200) {
          this.setState({
            msg: "Ошибка сервера",
          });
          return;
        }

        this.setState({ msg: "Вход произведен успешно" });
      });
    });
  };

  handleChangeUsername = (evt: any) => {
    this.setState({ username: evt.target.value });
  };
  handleChangePassword = (evt: any) => {
    this.setState({ password: evt.target.value });
  };

  public render() {
    const { username, password, msg } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.form}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Вход</h3>
              <span>{msg}</span>
            </div>
            <div className={styles.formBody}>
              <div className={styles.formGroup}>
                <FormLabel className={styles.formLabel}>
                  Имя пользователя
                </FormLabel>
                <Input
                  value={username}
                  onChange={this.handleChangeUsername}
                ></Input>
              </div>
              <div className={styles.formGroup}>
                <FormLabel>Пароль</FormLabel>
                <Input
                  type={"password"}
                  value={password}
                  onChange={this.handleChangePassword}
                ></Input>
              </div>
              <Button
                className={styles.submitButton}
                onClick={this.handleSubmit}
              >
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
      </div>
    );
  }
}
