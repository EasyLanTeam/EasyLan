import * as React from "react";
import * as yup from "yup";
import { ErrorMessage, Formik, FormikBag, FormikProps } from "formik";
import { toast } from "react-toastify";

import Input from "../../components/base/Input/Input";
import FormLabel from "../../components/base/FormLabel";
import Button from "../../components/base/Button";

import AccountService from "../../../data/services/AccountService";
import styles from "./RegisterPage.style.scss";
import { ApiFailureResult } from "../../../data/services/ApiResult";

interface IRegisterPageProps {}

type RegitsterFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const regitsterFormInitialValues: RegitsterFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const registerFormValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Обязательное поле")
    .max(150, "Слишком длинное имя пользователя"),
  email: yup
    .string()
    .email("Введите корректный e-mail")
    .max(150, "Слишком длинный e-mail"),
  password: yup
    .string()
    .required("Обязательное поле")
    .min(6, "Длина пароля не должна быть меньше 6 символов")
    .max(150, "Слишком длинный пароль"),
  confirmPassword: yup
    .string()
    .required("Обязательное поле")
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
});

class RegisterPage extends React.Component<IRegisterPageProps> {
  constructor(props: IRegisterPageProps) {
    super(props);
  }

  handleSubmit = (
    values: RegitsterFormValues,
    actions: FormikBag<any, RegitsterFormValues>
  ): void => {
    const { username, email, password, confirmPassword } = values;
    const registerData = {
      username,
      email,
      password,
      fullname: username,
      confirmPassword,
    };

    const accountService = new AccountService();
    accountService.create(registerData).then((res) => {
      if (res.success) {
        console.log("ok, user created");
        toast("Пользователь был успешно зарегистрирован", { type: "success" });
      } else {
        const { error } = res as ApiFailureResult;
        if (error.error === "LOGIN_ALREADY_USE") {
          actions.setFieldError("username", "Данный логин уже занят");
        } else {
          toast(error.error, { type: "error" });
        }
      }
    });
  };

  renderForm = (props: FormikProps<RegitsterFormValues>): JSX.Element => {
    const { email, password, confirmPassword, username } = props.values;
    const { handleSubmit, handleChange, handleBlur } = props;

    return (
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
              onChange={handleChange}
              onBlur={handleBlur}
            ></Input>
            <span className={styles.inputError}>
              <ErrorMessage name="email" />
            </span>
          </div>
          <div className={styles.formGroup}>
            <FormLabel className={styles.formLabel} htmlFor="username">
              Имя пользователя
            </FormLabel>
            <Input
              id="username"
              className={styles.input}
              value={username}
              onBlur={handleBlur}
              onChange={handleChange}
            ></Input>
            <span className={styles.inputError}>
              <ErrorMessage name="username" />
            </span>
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
              onBlur={handleBlur}
              onChange={handleChange}
            ></Input>
            <span className={styles.inputError}>
              <ErrorMessage name="password" />
            </span>
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
              onBlur={handleBlur}
              onChange={handleChange}
            ></Input>
            <span className={styles.inputError}>
              <ErrorMessage name="confirmPassword" />
            </span>
          </div>
          <Button
            type="submit"
            className={styles.submitButton}
            variant="primary"
            onClick={() => handleSubmit()}
          >
            Зарегистрироваться
          </Button>
        </div>
      </div>
    );
  };

  public render(): JSX.Element {
    return (
      <div className={styles.card}>
        <Formik
          initialValues={regitsterFormInitialValues}
          onSubmit={this.handleSubmit}
          validateOnBlur={true}
          validationSchema={registerFormValidationSchema}
        >
          {(props) => this.renderForm(props)}
        </Formik>
      </div>
    );
  }
}

export default RegisterPage;
