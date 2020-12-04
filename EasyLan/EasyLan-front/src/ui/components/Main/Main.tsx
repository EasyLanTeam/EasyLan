import * as React from "react";

import styles from "./Main.style.scss";

interface IMainProps {
  children: React.ReactNode;
}

const Main: React.FunctionComponent<IMainProps> = (props: IMainProps) => {
  return <main className={styles.main}>{props.children}</main>;
};

export default Main;
