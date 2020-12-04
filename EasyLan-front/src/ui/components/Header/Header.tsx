import * as React from "react";
import MainNav from "../MainNav";

import styles from "./Header.style.scss";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>EasyLan</h1>
      <MainNav />
    </header>
  );
};

export default Header;
