import * as React from "react";
import cn from "classnames";
import { mdiAccountCircle, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import { NavLink } from "react-router-dom";

import styles from "./Header.style.scss";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const [closeMainNav, setCloseMainNav] = React.useState(() => true);

  const handleMainNavToggleClick = () => {
    setCloseMainNav(!closeMainNav);
  };

  const handleNavItemClick = () => {
    setCloseMainNav(true);
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
            {/* <NavLink
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
            </NavLink> */}
            <NavLink
              className={cn(styles.userNavItem, styles.userNavItemProfile)}
              to={"/user"}
            >
              <Icon path={mdiAccountCircle} size="24px" className={styles.userNavIcon}></Icon>
              <span>Профиль</span>
            </NavLink>
            <NavLink
              className={cn(styles.userNavItem, styles.userNavItemLogout)}
              to={"/logout"}
            >
              Выход
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
