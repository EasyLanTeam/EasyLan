import * as React from "react";
import * as yup from "yup";
import { toast } from "react-toastify";
import { ErrorMessage, Formik, FormikBag, FormikProps } from "formik";
import { useHistory, useLocation } from "react-router-dom";

import Input from "../../components/base/Input/Input";
import FormLabel from "../../components/base/FormLabel";
import Button from "../../components/base/Button";
import AccountService from "../../../data/services/AccountService";
import { ApiFailureResult } from "../../../data/services/ApiResult";
import { useAuth } from "../../../domain/auth/appAuth";
import LocationState from "../../../infrastructure/ui/types/LocationState";

import styles from "./LoginPage.style.scss";

interface ILoginPageProps {}

type LoginFormValues = {
  username: string;
  password: string;
};

const loginFormInitialValues: LoginFormValues = {
  username: "",
  password: "",
};

const loginFormValidationSchema = yup.object().shape({
  username: yup.string().required("Обязательное поле"),
  password: yup.string().required("Обязательное поле"),
});

const renderForm = (props: FormikProps<LoginFormValues>) => {
  const { password, username } = props.values;
  const { handleSubmit, handleChange, handleBlur } = props;

  return (
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
            onChange={handleChange}
            onBlur={handleBlur}
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
            type={"password"}
            value={password}
            className={styles.input}
            onChange={handleChange}
            onBlur={handleBlur}
          ></Input>
          <span className={styles.inputError}>
            <ErrorMessage name="username" />
          </span>
        </div>
        <Button
          type="submit"
          className={styles.submitButton}
          variant="primary"
          onClick={() => handleSubmit()}
        >
          Войти
        </Button>
      </div>
    </div>
  );
};

const LoginPage: React.FunctionComponent<ILoginPageProps> = (
  props: ILoginPageProps
) => {
  const { setUser } = useAuth();
  const history = useHistory();
  const location = useLocation<LocationState>();

  const handleSubmit = (
    values: LoginFormValues,
    actions: FormikBag<any, LoginFormValues>
  ) => {
    const { username, password } = values;

    const accountService = new AccountService();
    accountService.login(username, password).then((res) => {
      if (res.success) {
        setUser(res.result);

        const { from } = location.state || { from: { pathname: "/" } };
        history.replace(from);
        // toast("Вход произведен успешно", { type: "success" });
      } else {
        const { error } = res as ApiFailureResult;
        if (error.error === "UNAUTHORIZED") {
          actions.setFieldError(
            "username",
            "Неверное имя пользователя или пароль"
          );
          actions.setFieldError(
            "password",
            "Неверное имя пользователя или пароль"
          );
        } else {
          toast(error.error, { type: "error" });
        }
      }
    });
  };

  return (
    <div className={styles.card}>
      <Formik
        initialValues={loginFormInitialValues}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validationSchema={loginFormValidationSchema}
      >
        {(props) => renderForm(props)}
      </Formik>
    </div>
  );
};

export default LoginPage;
