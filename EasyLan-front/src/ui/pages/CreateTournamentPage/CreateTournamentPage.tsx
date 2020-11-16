import * as React from "react";
import CreateTournamentForm from "../../components/CreateTournamentForm/CreateTournamentForm";
import Paper from "../../components/Paper";

import styles from "./CreateTournamentPage.style.scss";

interface ICreateTournamentPageProps {}

const CreateTournamentPage: React.FunctionComponent<ICreateTournamentPageProps> = (
  props
) => {
  return (
    <Paper>
      <CreateTournamentForm />
    </Paper>
  );
};

export default CreateTournamentPage;
