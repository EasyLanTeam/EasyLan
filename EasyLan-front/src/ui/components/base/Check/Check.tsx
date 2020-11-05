import * as React from "react";

import styles from "./Check.style.scss";

type ICheckProps = {
  id?: string;
  name?: string;
  label: string;
  value: string;
  type?: "box" | "radio";
} & React.InputHTMLAttributes<HTMLInputElement>;

const Check: React.FunctionComponent<ICheckProps> = ({
  id,
  label,
  type,
  ...rest
}: ICheckProps) => {
  if (type === "radio") {
    return (
      <label htmlFor={id} className={styles.container}>
        <input
          id={id}
          type="radio"
          className={styles.nativeInput}
          {...rest}
        ></input>
        <div className={styles.radio}></div>
        <span className={styles.label}>{label}</span>
      </label>
    );
  }
};

Check.defaultProps = {
  type: "box",
};

export default Check;
