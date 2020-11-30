import * as React from "react";
import cn from "classnames";
import { mdiAccountCircle, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../domain/auth/appAuth";

import styles from "./MainNav.style.scss";

interface IMainNavProps {}

const MainNav: React.FunctionComponent<IMainNavProps> = (props) => {
  const [closeMainNav, setCloseMainNav] = React.useState(() => true);
  const { user } = useAuth();

  const handleMainNavToggleClick = () => {
    setCloseMainNav(!closeMainNav);
  };

  const handleNavItemClick = () => {
    setCloseMainNav(true);
  };

  return (
    <div className={cn(styles.mainNav, closeMainNav && styles.mainNavClose)}>
      <div className={styles.mainNavToggle} onClick={handleMainNavToggleClick}>
        <Icon size={"24px"} path={mdiMenu} className={styles.menuIcon}></Icon>
      </div>

      <div className={styles.mainNavList}>
        <div className={styles.siteNav} onClick={handleNavItemClick}>
          <NavLink
            exact
            className={styles.siteNavItem}
            activeClassName={styles.siteNavItemActive}
            to={"/"}
          >
            Главная
          </NavLink>
          <NavLink
            exact
            className={styles.siteNavItem}
            activeClassName={styles.siteNavItemActive}
            to={"/tournaments"}
          >
            Турниры
          </NavLink>
        </div>
        <div className={styles.userNav} onClick={handleNavItemClick}>
          {user ? (
            <>
              <NavLink
                className={cn(styles.userNavItem, styles.userNavItemProfile)}
                to={`/user/${user.id}`}
              >
                <Icon
                  path={mdiAccountCircle}
                  size="24px"
                  className={styles.userNavIcon}
                ></Icon>
                <span>Профиль</span>
              </NavLink>
              <NavLink
                className={cn(styles.userNavItem, styles.userNavItemLogout)}
                to={"/logout"}
              >
                Выход
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                className={cn(styles.userNavItem, styles.userNavItemRegister)}
                to={"/register"}
              >
                Зарегистрироваться
              </NavLink>
              <NavLink
                className={cn(styles.userNavItem, styles.userNavItemLogin)}
                to={"/login"}
              >
                Войти
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNav;
