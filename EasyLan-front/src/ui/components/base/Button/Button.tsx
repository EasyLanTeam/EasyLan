import * as React from "react";
import cn from "classnames";

import styles from "./Button.style.scss";

type IButtonProps = {
} & React.ButtonHTMLAttributes<HTMLButtonElement>;


const Button: React.FunctionComponent<IButtonProps> = ({className, children, ...rest}: IButtonProps) => {
  return (
    <button className={cn(className, styles.button)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
