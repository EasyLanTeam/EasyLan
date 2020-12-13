import * as React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import PageMenu from "../../components/PageMenu";
import { Tournament } from "../../../data/entities/Tournament";
import TournamentRepository from "../../../data/services/TournamentRepository";
import { TournamentMain } from "./TournamentMain";
import TournamentParticipants from "./TournamentParticipants";
import TournamentGrid from "./TournamentGrid";
import ErrorPage from "../ErrorPage/ErrorPage";

const tournamentsRepository = new TournamentRepository();

interface ITournamentsPageProps {}
export interface ITournamentMainProps {
  tournament: Tournament;
}

let tournament: Tournament = null;

const TournamentPage: React.FunctionComponent<ITournamentsPageProps> = () => {
  const [isLoaded, setIsLoaded] = React.useState(null);
  const { url } = useRouteMatch();
  const { tournamentId } = useParams<{ tournamentId: string }>();

  if (isLoaded == null) {
    tournamentsRepository.getTournamentById(tournamentId).then((res) => {
      if (!res.success) {
        setIsLoaded(false);
        return;
      }

      tournament = res.result;
      setIsLoaded(true);
    });

    return null;
  } else if (isLoaded == false) {
    return <ErrorPage code={404} />;
  }

  return (
    <div>
      <PageMenu>
        <PageMenu.Item linkTo={`${url}`}>Основное</PageMenu.Item>
        <PageMenu.Item linkTo={`${url}/participants`}>
          Список участников
        </PageMenu.Item>
        <PageMenu.Item linkTo={`${url}/grid`}>Турнирная сетка</PageMenu.Item>
      </PageMenu>

      <Switch>
        <Route path={url} exact>
          <TournamentMain tournament={tournament} />
        </Route>
        <Route path={`${url}/participants`}>
          <TournamentParticipants />
        </Route>
        <Route path={`${url}/grid`}>
          <TournamentGrid />
        </Route>
      </Switch>
    </div>
  );
};

export default TournamentPage;
