import * as React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import PageMenu from "../../components/PageMenu";
import { Tournament } from "../../../data/entities/Tournament";
import TournamentRepository from "../../../data/services/TournamentRepository";
import { TournamentMain } from "./TournamentMain";
import TournamentParticipants from "./TournamentParticipants/TournamentParticipants";
import TournamentGrid from "./TournamentGrid/TournamentGrid";
import ErrorPage from "../ErrorPage/ErrorPage";
import { ApiFailureResult } from "../../../data/services/ApiResult";
import { notifyError } from "../../../domain/notify";
import UpdateTournamentPage from "../UpdateTournamentPage";

const tournamentsRepository = new TournamentRepository();

interface ITournamentsPageProps {}
export interface ITournamentMainProps {
  tournament: Tournament;
}

const renderPageMenu = (url: string) => {
  return (
    <PageMenu>
      <PageMenu.Item linkTo={`${url}`}>Основное</PageMenu.Item>
      <PageMenu.Item linkTo={`${url}/participants`}>
        Список участников
      </PageMenu.Item>
      <PageMenu.Item linkTo={`${url}/grid`}>Турнирная сетка</PageMenu.Item>
    </PageMenu>
  );
};

const TournamentPage: React.FunctionComponent<ITournamentsPageProps> = () => {
  const [tournament, setTournament] = React.useState(null);
  const { url } = useRouteMatch();
  const { tournamentId } = useParams<{ tournamentId: string }>();

  React.useEffect(() => {
    let cleanupFunction = false;

    console.log("Page effect call");

    tournamentsRepository.getTournamentById(tournamentId).then((res) => {
      if (!res.success) {
        const { error } = res as ApiFailureResult;
        if (error.error === "NOT_FOUND") {
          !cleanupFunction && setTournament(false);
        } else {
          notifyError(error.error);
        }
        return;
      }

      !cleanupFunction && setTournament(res.result);
    });

    return () => (cleanupFunction = true);
  }, []);

  if (tournament == null) {
    return null;
  } else if (tournament == false) {
    return <ErrorPage code={404} />;
  }

  return (
    <div>
      <Switch>
        <Route path={url} exact>
          {renderPageMenu(url)}
          <TournamentMain tournament={tournament} />
        </Route>
        <Route path={`${url}/participants`}>
          {renderPageMenu(url)}
          <TournamentParticipants />
        </Route>
        <Route path={`${url}/grid`}>
          {renderPageMenu(url)}
          <TournamentGrid tournament={tournament} />
        </Route>
        <Route path={`${url}/update`}>
          <UpdateTournamentPage tournament={tournament} />
        </Route>
      </Switch>
    </div>
  );
};

export default TournamentPage;
