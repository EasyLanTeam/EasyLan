import * as React from "react";
import cn from "classnames";

import styles from "./Button.style.scss";

type IButtonProps = {
  variant?: "primary" | "default";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FunctionComponent<IButtonProps> = ({
  className,
  children,
  variant,
  ...rest
}: IButtonProps) => {
  return (
    <button
      className={cn(
        className,
        styles.button,
        variant !== "default" && styles[`button--${variant}`]
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  variant: "default",
};

export default Button;
