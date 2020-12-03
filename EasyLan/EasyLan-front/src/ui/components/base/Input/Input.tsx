import * as React from "react";
import cn from "classnames";

import styles from "./Input.style.scss";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FunctionComponent<IInputProps> = ({
  className,
  ...rest
}: IInputProps) => {
  return <input className={cn(styles.input, className)} {...rest} />;
};

export default Input;
