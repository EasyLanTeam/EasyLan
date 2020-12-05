import * as React from "react";
import Button from "../../components/base/Button";
import Dialog from "../../components/Dialog/Dialog";

import styles from "./MainPage.style.scss";

interface IMainPageProps {}

const MainPage: React.FunctionComponent<IMainPageProps> = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClick}>Show modal</Button>
      <Dialog
        open={open}
        onOk={closeModal}
        onCancel={closeModal}
        message="Сообщение"
      ></Dialog>
    </>
  );
};

export default MainPage;
