import * as React from "react";
import { Tournament } from "../../../data/entities/Tournament";
import TournamentRepository from "../../../data/services/TournamentRepository";
import { useAuth } from "../../../domain/auth/appAuth";
import TournamentForm from "../../components/TournamentForm/TournamentForm";
import Paper from "../../components/Paper";
import { notifySuccess } from "../../../domain/notify";
import { useHistory } from "react-router-dom";

// import styles from "./CreateTournamentPage.style.scss";

interface ICreateTournamentPageProps {}

const CreateTournamentPage: React.FunctionComponent<ICreateTournamentPageProps> = () => {
  const auth = useAuth();
  const history = useHistory();

  const onSubmit = (tournament: Tournament) => {
    tournament.initiatorId = auth.user && auth.user.id;
    const rep = new TournamentRepository();
    rep.addTournament(tournament).then((res) => {
      notifySuccess("Турнир успешно создан");
      history.push("/tournaments");
    });
  };

  return (
    <Paper>
      <TournamentForm onSubmit={onSubmit} />
    </Paper>
  );
};

export default CreateTournamentPage;
