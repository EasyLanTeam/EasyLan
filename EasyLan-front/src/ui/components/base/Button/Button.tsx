import * as React from "react";
import cn from "classnames";
import Icon from "@mdi/react";

import styles from "./Button.style.scss";

type IButtonProps = {
  variant?: "primary" | "default";
  size?: "small" | "medium";
  icon?: {
    path: string;
  };
  children: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const renderButtonContentWithIcon = (
  content: string,
  buttonSize: "small" | "medium",
  { path: iconPath }: { path: string }
) => {
  return (
    <div className={styles.buttonWrapper}>
      <Icon
        path={iconPath}
        size={buttonSize === "small" ? "16px" : "24px"}
        style={{marginRight: "4px"}}
      ></Icon>
      <span>{content}</span>
    </div>
  );
};

const Button: React.FunctionComponent<IButtonProps> = ({
  className,
  children,
  variant,
  size,
  icon,
  ...rest
}: IButtonProps) => {
  return (
    <button
      className={cn(
        className,
        styles.button,
        variant !== "default" && styles[`button--${variant}`],
        size !== "medium" && styles[`button--${size}`]
      )}
      {...rest}
    >
      {icon ? renderButtonContentWithIcon(children, size, icon) : children}
    </button>
  );
};

Button.defaultProps = {
  variant: "default",
  size: "medium",
};

export default Button;
