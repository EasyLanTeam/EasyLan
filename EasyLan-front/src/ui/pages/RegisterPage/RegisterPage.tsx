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
  msg: string;
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
      msg: null,
    };
  }

  handleSubmit = (evt: any) => {
    const { username, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ msg: "Пароли должны совпадать" });
      return;
    }

    this.setState({ msg: "" }, () => {
      const req = {
        username,
        email,
        password,
        fullname: username,
      };

      fetch("/api/Registration", {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        mode: "cors"
      }).then((res) => {
        if (res.status === 422) {
          this.setState({
            msg: "Пользователь с таким именем уже существует",
          });
          return;
        }
        if (res.status !== 200) {
          this.setState({
            msg: "Ошибка сервера",
          });
          return;
        }

        this.setState({ msg: "Регистрация произведена успешно" });
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
    const { username, email, password, confirmPassword, msg } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.form}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Регистрация</h3>
              <div style={{ fontSize: "12px" }}>{msg}</div>
            </div>
            <div className={styles.formBody}>
              <div className={styles.formGroup}>
                <FormLabel className={styles.formLabel}>E-mail</FormLabel>
                <Input value={email} onChange={this.handleChangeEmail}></Input>
              </div>
              <div className={styles.formGroup}>
                <FormLabel>Имя пользователя</FormLabel>
                <Input
                  value={username}
                  onChange={this.handleChangeUsername}
                ></Input>
              </div>
              <div className={styles.formGroup}>
                <FormLabel>Пароль</FormLabel>
                <Input
                  value={password}
                  type={"password"}
                  onChange={this.handleChangePassword}
                ></Input>
              </div>
              <div className={styles.formGroup}>
                <FormLabel>Повторите пароль</FormLabel>
                <Input
                  value={confirmPassword}
                  type={"password"}
                  onChange={this.handleChangeConfirmPassword}
                ></Input>
              </div>
              <Button
                className={styles.submitButton}
                onClick={this.handleSubmit}
              >
                Зарегистрироваться
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
