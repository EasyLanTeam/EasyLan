import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import * as React from "react";
import Button from "../base/Button";
import Modal from "../base/Modal/Modal";

import styles from "./Dialog.style.scss";

interface IDialogProps {
  open: boolean;
  message: string;
  title?: string;
  onOk: any;
  onCancel: any;
}

const Dialog: React.FunctionComponent<IDialogProps> = ({
  open,
  message,
  title,
  onOk,
  onCancel,
}: IDialogProps) => {
  return (
    <Modal isOpen={open} onRequestClose={onCancel} className={styles.dialog}>
      <div className={styles.header}>
        <div className={styles.title}>{title || undefined}</div>
        <span className={styles.closeToggler} onClick={onCancel}>
          <Icon path={mdiClose} size="24px" />
        </span>
      </div>
      <div className={styles.body}>
        <div className={styles.message}>{message}</div>
        <div className={styles.dialogActions}>
          <Button variant="primary" className={styles.button} onClick={onOk}>
            Ок
          </Button>
          <Button className={styles.button} onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </div>
    </Modal>
  );
};

Dialog.defaultProps = {};

export default Dialog;
