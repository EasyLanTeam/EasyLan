import * as React from "react";

import styles from "./Paper.style.scss";

interface IPaperProps extends React.AllHTMLAttributes<HTMLDivElement> {}

const Paper: React.FunctionComponent<IPaperProps> = (props: IPaperProps) => {
  return <div className={styles.paper}>{props.children}</div>;
};

export default Paper;
