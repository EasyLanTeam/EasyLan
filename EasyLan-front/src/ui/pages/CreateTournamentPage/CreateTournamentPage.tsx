import * as React from "react";
import CreateTournamentForm from "../../components/CreateTournamentForm/CreateTournamentForm";

import styles from "./CreateTournamentPage.style.scss";

interface ICreateTournamentPageProps {}

const CreateTournamentPage: React.FunctionComponent<ICreateTournamentPageProps> = (
  props
) => {
  return (
    <div className={styles.card}>
      <CreateTournamentForm />
    </div>
  );
};

export default CreateTournamentPage;
