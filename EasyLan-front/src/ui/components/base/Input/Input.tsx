import * as React from "react";

import styles from "./Input.style.scss";

interface IInputProps {
  type?: "text" | "password";
}

const Input: React.FunctionComponent<IInputProps> = (props : IInputProps) => {
  return <input className={styles.input} type={props.type} />;
};

Input.defaultProps = {
  type: "text",
};

export default Input;
