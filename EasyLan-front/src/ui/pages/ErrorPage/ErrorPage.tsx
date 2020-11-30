import * as React from "react";

interface IErrorPageProps {
  code: number;
}

const ErrorPage: React.FunctionComponent<IErrorPageProps> = (
  props: IErrorPageProps
) => {
  const message = props.code === 404 ? "Ресурс не найден" : null;

  return <span>{message}</span>;
};

export default ErrorPage;
