import * as React from "react";
import cn from "classnames";

import IBaseComponentProps from "../../../../infrastructure/ui/interfaces/IBaseComponentProps";

import styles from "./FormLabel.style.scss";

interface IFormLabelProps extends IBaseComponentProps {
  for?: string;
  children?: React.ReactNode;
}

const FormLabel: React.FunctionComponent<IFormLabelProps> = (
  props: IFormLabelProps
) => {
  return (
    <label className={cn(props.className, styles.label)} htmlFor={props.for}>
      {props.children}
    </label>
  );
};

export default FormLabel;
