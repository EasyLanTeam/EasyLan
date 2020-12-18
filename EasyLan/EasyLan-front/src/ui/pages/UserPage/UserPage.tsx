import * as React from "react";
import Paper from "../../components/Paper";
import PageMenu from "../../components/PageMenu";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import AccountService from "../../../data/services/AccountService";
import { UserData } from "../../../data/entities/UserData";
import ErrorPage from "../ErrorPage/ErrorPage";
import { ApiFailureResult } from "../../../data/services/ApiResult";
import MyTournaments from "./MyTournaments";

import styles from "./UserPage.style.scss";

interface IUserPageProps {}

const UserPage: React.FunctionComponent<IUserPageProps> = () => {
  const { url } = useRouteMatch();
  const [userInfo, setUserInfo] = React.useState<UserData | false>(null);
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    let cleanupFunction = false;
    const accountService = new AccountService();
    accountService.getUserData(id).then((res) => {
      if (res.success) {
        if (!cleanupFunction) setUserInfo(res.result);
      } else {
        const { error } = res as ApiFailureResult;
        if (error.error === "NOT_FOUND") setUserInfo(false);
        else toast("Произошла ошибка. Попробуете еще раз", { type: "error" });
      }
    });

    return () => (cleanupFunction = true);
  }, []);

  if (userInfo == null) {
    return null;
  } else if (userInfo == false) {
    return <ErrorPage code={404} />;
  }

  const { email, username } = userInfo;
  const isOwnPage = id === userInfo.id;

  return (
    <div>
      <PageMenu>
        <PageMenu.Item linkTo={url}>Основное</PageMenu.Item>
        {isOwnPage ? (
          <PageMenu.Item linkTo={`${url}/mytournaments`}>
            Мои турниры
          </PageMenu.Item>
        ) : null}
      </PageMenu>

      <Switch>
        <Route path={`${url}`} exact>
          <div className={styles.container}>
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
        </Route>
        <Route path={`${url}/mytournaments`}>
          <MyTournaments />
        </Route>
      </Switch>
    </div>
  );
};

export default UserPage;
