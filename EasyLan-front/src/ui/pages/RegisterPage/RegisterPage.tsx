import * as React from "react";

import Input from "../../components/base/Input/Input";
import FormLabel from "../../components/base/FormLabel";
import Button from "../../components/base/Button";

import styles from "./RegisterPage.style.scss";

interface IRegisterPageProps {}

const RegisterPage: React.FunctionComponent<IRegisterPageProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.form}>
          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>Регистрация</h3>
          </div>
          <div className={styles.formBody}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel}>E-mail</FormLabel>
              <Input></Input>
            </div>
            <div className={styles.formGroup}>
              <FormLabel>Имя пользователя</FormLabel>
              <Input></Input>
            </div>
            <div className={styles.formGroup}>
              <FormLabel>Пароль</FormLabel>
              <Input type={"password"}></Input>
            </div>
            <div className={styles.formGroup}>
              <FormLabel>Повторите пароль</FormLabel>
              <Input type={"password"}></Input>
            </div>
            <Button className={styles.submitButton}>Зарегистрироваться</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
