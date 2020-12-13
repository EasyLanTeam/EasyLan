import * as React from "react";
import cn from "classnames";

import styles from "./FormLabel.style.scss";

type IFormLabelProps = {
} & React.LabelHTMLAttributes<HTMLLabelElement>

const FormLabel: React.FunctionComponent<IFormLabelProps> = (
  {className, children, ...rest} : IFormLabelProps
) => {
  return (
    <label className={cn(className, styles.label)} {...rest}>
      {children}
    </label>
  );
};

export default FormLabel;
