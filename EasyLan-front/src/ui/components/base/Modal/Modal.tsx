import * as React from "react";
import ReactModal from "react-modal";
import cn from "classnames";

import styles from "./Modal.style.scss";

interface IModalProps extends ReactModal.Props {}

const Modal: React.FunctionComponent<IModalProps> = ({
  overlayClassName,
  className,
  ...rest
}: IModalProps) => {
  return (
    <ReactModal
      overlayClassName={cn(styles.overlay, overlayClassName)}
      className={cn(styles.body, className)}
      {...rest}
    ></ReactModal>
  );
};

export default Modal;
