import * as React from "react";
import Icon from "@mdi/react";
import { mdiVk } from "@mdi/js";
import cn from "classnames";

import Input from "../../components/base/Input/Input";
import FormLabel from "../../components/base/FormLabel";
import Button from "../../components/base/Button";

import styles from "./LoginPage.style.scss";

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.form}>
          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>Вход</h3>
          </div>
          <div className={styles.formBody}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel}>Имя пользователя</FormLabel>
              <Input></Input>
            </div>
            <div className={styles.formGroup}>
              <FormLabel>Пароль</FormLabel>
              <Input type={"password"}></Input>
            </div>
            <Button className={styles.submitButton}>Войти</Button>
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
};

export default LoginPage;
