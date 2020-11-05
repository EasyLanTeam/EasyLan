import * as React from "react";

import styles from "./TextArea.style.scss";

interface ITextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FunctionComponent<ITextAreaProps> = ({
  className,
  ...rest
}: ITextAreaProps) => {
  return <textarea className={styles.textarea} {...rest}></textarea>;
};

export default TextArea;
