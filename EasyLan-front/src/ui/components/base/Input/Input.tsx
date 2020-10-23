import * as React from "react";

import styles from "./Input.style.scss";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FunctionComponent<IInputProps> = ({
  type,
  value,
  onChange,
} : IInputProps) => {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
