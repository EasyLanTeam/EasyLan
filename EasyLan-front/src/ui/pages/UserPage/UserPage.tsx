import * as React from "react";
import Paper from "../../components/Paper";
import PageMenu from "../../components/PageMenu";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AccountService from "../../../data/services/AccountService";
import { UserData } from "../../../data/entities/UserData";

import styles from "./UserPage.style.scss";

interface IUserPageProps {}
interface IUserPageState {
  userInfo: UserData;
}

const UserPage: React.FunctionComponent<IUserPageProps> = () => {
  const [userInfo, setUserInfo] = React.useState<UserData>(null);
  const { id } = useParams<{ id: string }>();
  React.useEffect(() => {
    if (userInfo !== null) return;
    const accountService = new AccountService();
    accountService.getUserData(id).then((res) => {
      if (res.success) {
        setUserInfo(res.result);
      } else {
        toast("Произошла ошибка. Попробуете еще раз", { type: "error" });
      }
    });
  });

  if (userInfo == null) {
    return null;
  }

  const { email, username } = userInfo;

  return (
    <div className={styles.container}>
      <PageMenu>
        <PageMenu.Item active>Основное</PageMenu.Item>
        <PageMenu.Item>Мои турниры</PageMenu.Item>
      </PageMenu>

      <Paper className={styles.paper}>
        <div className={styles.userInfo}>
          <div className={styles.userInfoHeader}>
            <div className={styles.userInfoUsername}>{username}</div>
            <div
              className={styles.userInfoRating}
            >{`Рейтинг: ${"Неизвестно"}`}</div>
          </div>
          <div className={styles.userInfoBody}>
            <div className={styles.userInfoItem}>
              <span>{`Публичное имя: ${username}`}</span>
            </div>
            <div className={styles.userInfoItem}>
              <span>{`E-mail: ${email}`}</span>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default UserPage;
