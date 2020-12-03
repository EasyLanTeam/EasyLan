import * as React from "react";
import styles from "./ErrorPage.style.scss";

const errorDefinitions: { [code: number]: string } = {
  404: "Запрашиваемый ресурс не найден",
};

interface IErrorPageProps {
  code: number;
}

const ErrorPage: React.FunctionComponent<IErrorPageProps> = (
  props: IErrorPageProps
) => {
  const { code } = props;
  const message = errorDefinitions[code] || null;

  return (
    <div className={styles.container}>
      <div className={styles.errorWrapper}>
        <div className={styles.errorCode}>{code}</div>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default ErrorPage;
