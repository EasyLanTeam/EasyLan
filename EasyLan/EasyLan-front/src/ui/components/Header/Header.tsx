import * as React from "react";
import { Link } from "react-router-dom";
import MainNav from "../MainNav";
import logo from "../../../../assets/img/result.svg";

import styles from "./Header.style.scss";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoWrapper}>
        <h1 className={styles.title}>EasyLan</h1>
        <img src={logo} width="48px" className={styles.logo}></img>
      </Link>
      <MainNav />
    </header>
  );
};

export default Header;
