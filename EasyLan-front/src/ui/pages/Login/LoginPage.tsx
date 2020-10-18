import * as React from "react";
import cn from "classnames";

import styles from "./LoginPage.style.scss";

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  return <div className={cn(styles.containerModule, styles.containerMix)}>It works</div>;
};

export default LoginPage;
