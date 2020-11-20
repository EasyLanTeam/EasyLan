import * as React from "react";
import cn from "classnames";
import Paper from "../../components/Paper";
import PageMenu from "../../components/PageMenu";

import styles from "./UserPage.style.scss";

interface IUserPageProps {}

const UserPage: React.FunctionComponent<IUserPageProps> = (props) => {
  return (
    <div className={styles.container}>
      <PageMenu>
        <PageMenu.Item active>Основное</PageMenu.Item>
        <PageMenu.Item>Мои турниры</PageMenu.Item>
      </PageMenu>

      <Paper className={styles.paper}>
        <div className={styles.userInfo}>
          <div className={styles.userInfoHeader}>
            <div className={styles.userInfoUsername}>Username</div>
            <div className={styles.userInfoRating}>{`Рейтинг: ${2500}`}</div>
          </div>
          <div className={styles.userInfoBody}>
            <div className={styles.userInfoItem}>
              <span>{`Публичное имя: ${"VasilyPupkin"}`}</span>
            </div>
            <div className={styles.userInfoItem}>
              <span>{`E-mail: ${"v.pupkin@gmail.com"}`}</span>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default UserPage;
