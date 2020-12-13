import * as React from "react";
import cn from "classnames";
import styles from "./TextArea.style.scss";

interface ITextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FunctionComponent<ITextAreaProps> = ({
  className,
  ...rest
}: ITextAreaProps) => {
  return (
    <textarea className={cn(styles.textarea, className)} {...rest}></textarea>
  );
};

export default TextArea;
