import * as React from "react";
import cn from "classnames";

import styles from "./Paper.style.scss";

interface IPaperProps extends React.AllHTMLAttributes<HTMLDivElement> {}

const Paper: React.FunctionComponent<IPaperProps> = (props: IPaperProps) => {
  return (
    <div className={cn(styles.paper, props.className)}>{props.children}</div>
  );
};

export default Paper;
