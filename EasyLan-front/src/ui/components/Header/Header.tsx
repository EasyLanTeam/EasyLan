import * as React from "react";
import { mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";

import styles from "./Header.style.scss";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>EasyLan</h1>

      <Icon size={"24px"} path={mdiMenu} className={styles.menuIcon}></Icon>
    </header>
  );
};

export default Header;
