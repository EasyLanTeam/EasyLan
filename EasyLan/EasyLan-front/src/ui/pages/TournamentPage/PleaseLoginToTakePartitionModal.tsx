import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import Modal from "../../components/base/Modal/Modal";
import { useLocation } from "react-router-dom";

import styles from "./PleaseLoginToTakePartitionModal.style.scss";

interface IPleaseLoginToTakePartitionModalProps {
  open: boolean;
  onExit: any;
}

const PleaseLoginToTakePartitionModal: React.FunctionComponent<IPleaseLoginToTakePartitionModalProps> = ({
  open,
  onExit,
}: IPleaseLoginToTakePartitionModalProps) => {
  const location = useLocation();
  const [redirectToLogin, setRedirectToLogin] = React.useState(false);

  const handleLoginLinkClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    setRedirectToLogin(true);
  };

  if (redirectToLogin) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  }

  return (
    <Modal isOpen={open} onRequestClose={onExit} className={styles.modal}>
      <div className={styles.text}>
        Для принятия участия в турнире необходимо{" "}
        <Link to="/register" className={styles.link}>
          зарегистрироваться
        </Link>
        .
      </div>
      <div>
        Уже есть аккаунт?{" "}
        <Link
          to="/login"
          className={styles.link}
          onClick={handleLoginLinkClick}
        >
          Войти
        </Link>
        .
      </div>
    </Modal>
  );
};

export default PleaseLoginToTakePartitionModal;
