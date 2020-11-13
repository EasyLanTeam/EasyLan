import * as React from "react";
import cn from "classnames";
import { mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import { NavLink } from "react-router-dom";

import styles from "./Header.style.scss";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const [closeMainNav, setCloseMainNav] = React.useState(() => true);

  const handleMainNavToggleClick = () => {
    setCloseMainNav(!closeMainNav);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>EasyLan</h1>
      <div className={cn(styles.mainNav, closeMainNav && styles.mainNavClose)}>
        <div
          className={styles.mainNavToggle}
          onClick={handleMainNavToggleClick}
        >
          <Icon size={"24px"} path={mdiMenu} className={styles.menuIcon}></Icon>
        </div>

        <div className={styles.mainNavList}>
          <div className={styles.siteNav}>
            <NavLink
              className={styles.siteNavItem}
              activeClassName={styles.siteNavItemActive}
              to={"/"}
              exact
            >
              Главная
            </NavLink>
            <NavLink
              className={styles.siteNavItem}
              activeClassName={styles.siteNavItemActive}
              to={"/tournaments"}
            >
              Турниры
            </NavLink>
            <NavLink
              className={styles.siteNavItem}
              activeClassName={styles.siteNavItemActive}
              to={"/createtournament"}
            >
              Создать турнир
            </NavLink>
          </div>
          <div className={styles.userNav}>
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
            {/* <div className={styles.userNavItem}>Профиль</div>
            <div className={styles.userNavItem}>Выход</div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
