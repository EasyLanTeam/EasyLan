import * as React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PageMenu from "../../components/PageMenu";
import { TournamentMain } from "./TournamentMain";
import TournamentParticipants from "./TournamentParticipants/TournamentParticipants";
import TournamentGrid from "./TournamentGrid/TournamentGrid";
import UpdateTournamentPage from "../UpdateTournamentPage";
import {
  ProvideTournament,
  useTournament,
} from "../../../domain/tournamentContext";

interface ITournamentsPageProps {}

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

const TournamentPageWrapper = () => {
  const { url } = useRouteMatch();
  const { tournament } = useTournament();

  return (
    <div>
      <Switch>
        <Route path={url} exact>
          {renderPageMenu(url)}
          <TournamentMain />
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

const TournamentPage: React.FunctionComponent<ITournamentsPageProps> = () => {
  return (
    <ProvideTournament>
      <TournamentPageWrapper />
    </ProvideTournament>
  );
};

export default TournamentPage;
