import * as React from "react";
import cn from "classnames";
import IBaseComponentProps from "../../../../infrastructure/ui/interfaces/IBaseComponentProps";

import styles from "./Button.style.scss";

interface IButtonProps extends IBaseComponentProps {
  children: React.ReactNode;
}

const Button: React.FunctionComponent<IButtonProps> = (props: IButtonProps) => {
  return (
    <button className={cn(props.className, styles.button)}>
      {props.children}
    </button>
  );
};

export default Button;
